import firebase from "firebase"
import "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyC6D704bNlbRPG8CFCJNRmVYnpsP0Y_93I",
  authDomain: "bionic-path-205512.firebaseapp.com",
  databaseURL: "https://bionic-path-205512.firebaseio.com",
  projectId: "bionic-path-205512",
  storageBucket: "bionic-path-205512.appspot.com",
  messagingSenderId: "597379616946"
}

firebase.initializeApp(firebaseConfig)

/** requires timestamp settings for later versions of firebase */

export default firebase
