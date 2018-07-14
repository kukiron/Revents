import firebase from "firebase"
import "firebase/firestore"

import { firebaseApiKey, messagingSenderId } from "./keys"

const firebaseConfig = {
  apiKey: firebaseApiKey,
  authDomain: "bionic-path-205512.firebaseapp.com",
  databaseURL: "https://bionic-path-205512.firebaseio.com",
  projectId: "bionic-path-205512",
  storageBucket: "bionic-path-205512.appspot.com",
  messagingSenderId
}

firebase.initializeApp(firebaseConfig)

/** Requires timestamp settings for later versions of firebase */

export default firebase
