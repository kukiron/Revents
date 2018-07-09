const functions = require("firebase-functions")
const admin = require("firebase-admin")
admin.initializeApp(functions.config().firebase)

const newActivity = (type, event, id) => {
  const { date, hostedBy, title, hostPhotoURL, hostUid } = event
  return {
    type,
    eventDate: date,
    hostedBy,
    title,
    photoURL: hostPhotoURL,
    timestamp: admin.firestore.FieldValue.serverTimestamp(),
    hostUid,
    eventId: id
  }
}

const addActivityToCollection = activity =>
  admin
    .firestore()
    .collection("activity")
    .add(activity)
    .then(docRef => console.log("Activity created with ID: ", docRef.id))
    .catch(error => console.log("Error adding activity", error))

exports.createActivity = functions.firestore
  .document("events/{eventId}")
  .onCreate(event => {
    let newEvent = event.data()
    const activity = newActivity("newEvent", newEvent, event.id)

    return addActivityToCollection(activity)
  })

exports.cancelActivity = functions.firestore
  .document("events/{eventId}")
  .onUpdate((event, context) => {
    let updatedEvent = event.after.data()
    let previousEvent = event.before.data()

    if (
      !updatedEvent.cancelled ||
      updatedEvent.cancelled === previousEvent.cancelled
    )
      return false

    const activity = newActivity(
      "cancelledEvent",
      updatedEvent,
      context.params.eventId
    )

    return addActivityToCollection(activity)
  })
