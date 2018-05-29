import firebase from "firebase"
import "firebase/firestore"

import { firebaseConfig } from "./keys"

firebase.initializeApp(firebaseConfig)

/** Requires timestamp settings for later versions of firebase */

export default firebase
