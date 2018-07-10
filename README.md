# Revents

Working prototype for event organizing app built with React, Redux, Semantic-UI & Firestore.

## Getting started

The app is built with create-react-app. So, to get start with:

```shell
> git clone https://github.com/kukiron/Revents.git
> cd Revents
> npm install
> npm start
```

## Firebase setup

You need to set up a project in firebase & in Google for this repo to function properly. Use the Google API key & Firebase config object from respective developer consoles & create file `./src/app/config/keys/dev.js`.

```javascript
module.exports = {
  googleApiKey: "Your GOOGLE_API_KEY",
  // Firebase configuration from dev console
  firebaseConfig: {
    apiKey: "....",
    authDomain: "....",
    databaseURL: "....",
    projectId: "....",
    storageBucket: "....",
    messagingSenderId: "...."
  }
}
```
