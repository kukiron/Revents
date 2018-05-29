import { combineReducers } from "redux"
import { reducer as formReducer } from "redux-form"
import { firebaseReducer } from "react-redux-firebase"
import { firestoreReducer } from "redux-firestore"
import { reducer as toastrReducer } from "react-redux-toastr"

import testReducer from "../../features/testArea/testReducer"
import eventReducer from "../../features/events/eventReducer"
import modalReducer from "../../features/modals/modalReducer"
import authReducer from "../../features/auth/authReducer"
import asyncReducer from "../../features/async/asyncReducer"

const rootReducer = combineReducers({
  form: formReducer,
  test: testReducer,
  events: eventReducer,
  modals: modalReducer,
  auth: authReducer,
  async: asyncReducer,
  toastr: toastrReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer
})

export default rootReducer
