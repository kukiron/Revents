import moment from "moment"
import { toastr } from "react-redux-toastr"

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
