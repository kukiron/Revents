const googleApiKey = `${process.env.REACT_APP_GOOGLE_API_KEY}`
const firebaseApiKey = `${process.env.REACT_APP_FIREBASE_CONFIG_apiKey}`
const messagingSenderId = `${
  process.env.REACT_APP_FIREBASE_CONFIG_messagingSenderId
  }`

module.exports = { googleApiKey, firebaseApiKey, messagingSenderId }
