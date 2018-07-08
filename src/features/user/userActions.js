import moment from "moment"
import cuid from "cuid"
import { toastr } from "react-redux-toastr"

import { FETCH_EVENTS } from "../events/eventConstants"
import firebase from "../../app/config/firebase"
import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError
} from "../async/asyncActions"

export const updateProfile = user => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  const firebase = getFirebase()
  const { isLoaded, isEmpty, ...updateUser } = user
  if (updateUser.dateOfBirth !== getState().firebase.profile.dateOfBirth) {
    updateUser.dateOfBirth = moment(updateUser.dateOfBirth).toDate()
  }

  try {
    await firebase.updateProfile(updateUser)
    toastr.success("Success", "Profile updated!")
  } catch (error) {
    console.log(error)
  }
}

export const uploadProfileImage = (file, fileName) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const imageName = cuid()
  const firebase = getFirebase()
  const firestore = getFirestore()
  const user = firebase.auth().currentUser
  const path = `${user.uid}/user_images`
  const options = {
    name: imageName
  }

  try {
    dispatch(asyncActionStart())
    // upload the image file to firebase storage
    let uploadedFile = await firebase.uploadFile(path, file, null, options)
    // get url of the image
    let downloadURL = await uploadedFile.uploadTaskSnapshot.downloadURL
    // get userdoc from the firestore
    let userDoc = await firestore.get(`users/${user.uid}`)
    // check if user has a photo; if not, update profile with new image
    if (!userDoc.data().photoURL) {
      await firebase.updateProfile({ photoURL: downloadURL })
      await user.updateProfile({ photoURL: downloadURL })
    }
    // add the new photo to photos collection
    await firestore.add(
      {
        collection: "users",
        doc: user.uid,
        subcollections: [{ collection: "photos" }]
      },
      {
        name: imageName,
        url: downloadURL
      }
    )
    dispatch(asyncActionFinish())
  } catch (error) {
    console.log(error)
    dispatch(asyncActionError())
    throw new Error("Problem uploading photos")
  }
}

export const deletePhoto = photo => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase()
  const firestore = getFirestore()
  const user = firebase.auth().currentUser

  try {
    await firebase.deleteFile(`${user.uid}/user_images/${photo.name}`)
    await firestore.delete({
      collection: "users",
      doc: user.uid,
      subcollections: [{ collection: "photos", doc: photo.id }]
    })
  } catch (error) {
    console.log(error)
    throw new Error("Problem deleting the photo")
  }
}

export const setMainPhoto = photo => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  const firebase = getFirebase()

  try {
    await firebase.updateProfile({
      photoURL: photo.url
    })
  } catch (error) {
    console.log(error)
    throw new Error("Poblem detting main photo")
  }
}

export const goingToEvent = event => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  const firestore = getFirestore()
  const user = firestore.auth().currentUser
  const photoURL = getState().firebase.profile.photoURL
  const attnedee = {
    going: true,
    joinDate: Date.now(),
    photoURL: photoURL || "/assets/user.png",
    displayName: user.displayName,
    host: false
  }

  try {
    await firestore.update(`events/${event.id}`, {
      [`attendees.${user.uid}`]: attnedee
    })
    await firestore.set(`event_attendees/${event.id}_${user.uid}`, {
      eventId: event.id,
      userUid: user.uid,
      eventDate: event.date,
      host: false
    })
    toastr.success("Success", "You have signed up for the event")
  } catch (error) {
    console.log(error)
    toastr.error("Oops", "Problem signing up to the event")
  }
}

export const cancellGoingToEvent = event => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  const firestore = getFirestore()
  const user = firestore.auth().currentUser

  try {
    await firestore.update(`events/${event.id}`, {
      [`attendees.${user.uid}`]: firestore.FieldValue.delete()
    })
    await firestore.delete(`event_attendees/${event.id}_${user.uid}`)
    toastr.success(
      "Success",
      "You've successfully removed yourself from the event"
    )
  } catch (error) {
    console.log(error)
    toastr.error("Oops", "Somethinf went wrong")
  }
}

export const getUserEvents = (userUid, activeTab) => async (
  dispatch,
  getState
) => {
  dispatch(asyncActionStart())
  const firestore = firebase.firestore()
  const today = new Date(Date.now())
  let eventsRef = firestore.collection("event_attendees")
  let query

  switch (activeTab) {
    case 1: // past events
      query = eventsRef
        .where("userUid", "==", userUid)
        .where("eventDate", "<=", today)
        .orderBy("eventDate", "desc")
      break
    case 2: // future events
      query = eventsRef
        .where("userUid", "==", userUid)
        .where("eventDate", ">=", today)
        .orderBy("eventDate")
      break
    case 3: // hosted events
      query = eventsRef
        .where("userUid", "==", userUid)
        .where("host", "==", true)
        .orderBy("eventDate", "desc")
      break
    default:
      query = eventsRef
        .where("userUid", "==", userUid)
        .orderBy("eventDate", "desc")
  }

  try {
    let querySnapshot = await query.get()
    let events = []

    for (let doc in querySnapshot.docs) {
      let event = await firestore
        .collection("events")
        .doc(querySnapshot.docs[doc].data().eventId)
        .get()

      events.push({ ...event.data(), id: event.id })
    }

    dispatch({ type: FETCH_EVENTS, payload: { events } })
    dispatch(asyncActionFinish())
  } catch (error) {
    console.log(error)
    dispatch(asyncActionError())
  }
}
