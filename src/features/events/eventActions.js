import moment from "moment"
import { toastr } from "react-redux-toastr"
import compareAsc from "date-fns/compare_asc"

import { FETCH_EVENTS } from "./eventConstants"
import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError
} from "../async/asyncActions"
import { createNewEvent } from "../../app/common/utils/helpers"
import firebase from "../../app/config/firebase"

export const createEvent = event => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  const firestore = getFirestore()
  const user = firestore.auth().currentUser
  const photoURL = getState().firebase.profile.photoURL
  let newEvent = createNewEvent(user, photoURL, event)

  try {
    let createdEvent = await firestore.add("events", newEvent)
    await firestore.set(`event_attendees/${createdEvent.id}_${user.uid}`, {
      eventId: createdEvent.id,
      userUid: user.uid,
      eventDate: event.date,
      host: true
    })
    toastr.success("Success!", "Event successfully created")
  } catch (err) {
    console.log(err)
    toastr.error("Oops!", "Something went wrong")
  }
}

export const updateEvent = event => async (dispatch, getState) => {
  const firestore = firebase.firestore()
  if (event.date !== getState().firestore.ordered.events[0].date) {
    event.date = moment(event.date).toDate()
  }

  try {
    dispatch(asyncActionStart())
    let eventDocRef = firestore.collection("events").doc(event.id)
    let dateEqual = compareAsc(
      getState().firestore.ordered.events[0].date,
      event.date
    )
    if (dateEqual !== 0) {
      let batch = firestore.batch()
      await batch.update(eventDocRef, event)

      let eventAttendeeRef = firestore.collection("event_attendees")
      let eventAttendeeQuery = await eventAttendeeRef.where(
        "eventId",
        "==",
        event.id
      )
      let eventAttendeeQuerySnap = await eventAttendeeQuery.get()

      for (let doc in eventAttendeeQuerySnap.docs) {
        let eventAttendeeDocRef = await firestore
          .collection("event_attendees")
          .doc(eventAttendeeQuerySnap.docs[doc].id)

        await batch.update(eventAttendeeDocRef, {
          eventDate: event.date
        })
      }

      await batch.commit()
    } else {
      await eventDocRef.update(event)
    }

    dispatch(asyncActionFinish())
    toastr.success("Success!", "Event has been updated")
  } catch (err) {
    console.log(err)
    dispatch(asyncActionError())
    toastr.error("Oops!", "Something went wrong")
  }
}

export const cancelToggle = (cancelled, eventId) => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  const firestore = getFirestore()
  const message = cancelled
    ? "Are you sure you want to cancell the event?"
    : "The event will be reactivated - are you sure?"

  try {
    toastr.confirm(message, {
      onOk: () => firestore.update(`events/${eventId}`, { cancelled })
    })
  } catch (error) {
    console.log(error)
  }
}

export const getEventsForDashboard = lastEvent => async dispatch => {
  let today = new Date(Date.now())
  const firestore = firebase.firestore()
  const eventsRef = firestore.collection("events")

  try {
    dispatch(asyncActionStart())
    let startAfter =
      lastEvent &&
      (await firestore
        .collection("events")
        .doc(lastEvent.id)
        .get())
    let query = lastEvent
      ? eventsRef
          .where("date", ">=", today)
          .orderBy("date")
          .startAfter(startAfter)
          .limit(2)
      : eventsRef
          .where("date", ">=", today)
          .orderBy("date")
          .limit(2)

    let querySnapshot = await query.get()
    if (querySnapshot.docs.length === 0) {
      dispatch(asyncActionFinish())
      return querySnapshot
    }

    let events = []

    for (let doc in querySnapshot.docs) {
      let event = {
        ...querySnapshot.docs[doc].data(),
        id: querySnapshot.docs[doc].id
      }
      events.push(event)
    }

    dispatch({ type: FETCH_EVENTS, payload: { events } })
    dispatch(asyncActionFinish())
    return querySnapshot
  } catch (error) {
    console.log(error)
    dispatch(asyncActionError())
  }
}

export const addEventComment = (eventId, values, parentId) => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  const firebase = getFirebase()
  const profile = getState().firebase.profile
  const user = firebase.auth().currentUser

  let newComment = {
    parentId,
    displayName: profile.displayName,
    photoURL: profile.photoURL || "/assets/user.png",
    uid: user.uid,
    text: values.comment,
    date: Date.now()
  }

  try {
    await firebase.push(`event_chat/${eventId}`, newComment)
  } catch (error) {
    console.log(error)
    toastr.error("Oops!", "Problem adding comment")
  }
}
