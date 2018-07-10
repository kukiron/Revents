import { SubmissionError, reset } from "redux-form"
import { toastr } from "react-redux-toastr"
import { closeModal } from "../modals/modalActions"

export const loginUser = ({ email, password }) => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  const firebase = getFirebase()

  try {
    await firebase.auth().signInWithEmailAndPassword(email, password)
    dispatch(closeModal())
  } catch (err) {
    console.log(err)
    throw new SubmissionError({
      _error: "Bad login info. Login failed"
    })
  }
  dispatch(closeModal())
}

export const registerUser = ({ email, password, displayName }) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase()
  const firestore = getFirestore()

  try {
    let createdUser = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
    await createdUser.updateProfile({ displayName })

    let newUser = {
      displayName,
      createdAt: firestore.FieldValue.serverTimestamp()
    }
    await firestore.set(`users/${createdUser.uid}`, { ...newUser })
    dispatch(closeModal())
  } catch (error) {
    throw new SubmissionError({
      _error: error.message
    })
  }
}

export const socialLogin = selectedProvider => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase()
  const firestore = getFirestore()

  try {
    dispatch(closeModal())
    let user = await firebase.login({
      provider: selectedProvider,
      type: "popup"
    })

    if (user.additionalUserInfo.isNewUser) {
      await firestore.set(`users/${user.user.uid}`, {
        displayName: user.profile.displayName,
        photoURL: user.profile.avatarUrl,
        createdAt: firestore.FieldValue.serverTimestamp()
      })
    }
  } catch (error) {
    console.log(error)
  }
}

export const updatePassword = credential => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  const firebase = getFirebase()
  const user = firebase.auth().currentUser

  try {
    await user.updatePassword(credential.newPassword1)
    await dispatch(reset("account"))
    toastr.success("Success", "Your password has been updated")
  } catch (err) {
    throw new SubmissionError({
      _error: err.message
    })
  }
}
