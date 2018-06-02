import moment from "moment"

export const createNewEvent = (user, photoURL, event) => {
  event.date = moment(event.date).toDate()

  return {
    ...event,
    hostUid: user.uid,
    hostedBy: user.displayName,
    hostPhotoURL: photoURL || "/assets/user.png",
    createdAt: Date.now(),
    attendees: {
      [user.uid]: {
        going: true,
        joinDate: Date.now(),
        photoURL: photoURL || "/assets/user.png",
        displayName: user.displayName,
        host: true
      }
    }
  }
}

export const objToArr = obj =>
  obj && Object.entries(obj).map(e => Object.assign(e[1], { id: e[0] }))
