import moment from "moment"
import cuid from "cuid"
import { toastr } from "react-redux-toastr"

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
  } catch (err) {
    console.log(err)
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
    return await firebase.updateProfile({
      photoURL: photo.url
    })
  } catch (error) {
    console.log(error)
    throw new Error("Poblem detting main photo")
  }
}
