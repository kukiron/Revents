import { createStore, applyMiddleware } from "redux"
import reduxThunk from "redux-thunk"
import { reactReduxFirebase, getFirebase } from "react-redux-firebase"
import { reduxFirestore, getFirestore } from "redux-firestore"
import { composeWithDevTools } from "redux-devtools-extension"

import firebase from "../config/firebase"
import rootReducer from "../reducers"

const rrfConfig = {
  userProfile: "users",
  attachAuthIsReady: true,
  useFirestoreForProfile: true,
  updateProfileOnLogin: false
}

export const configureStore = preloadedState => {
  const middlewares = [
    reduxThunk.withExtraArgument({ getFirebase, getFirestore })
  ]
  const middlewareEnhancer = applyMiddleware(...middlewares)
  const storeEnhancers = [middlewareEnhancer]

  const composedEnhancer = composeWithDevTools(
    ...storeEnhancers,
    reactReduxFirebase(firebase, rrfConfig),
    reduxFirestore(firebase)
  )

  const store = createStore(rootReducer, preloadedState, composedEnhancer)

  // Enable hot module replacement
  if (process.env.NODE_ENV !== "production") {
    if (module.hot) {
      module.hot.accept("../reducers", () => {
        const newRootReducer = require("../reducers").default
        store.replaceReducer(newRootReducer)
      })
    }
  }

  return store
}
