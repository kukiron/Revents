# Revents

[![Build Status](https://travis-ci.org/kukiron/Revents.svg?branch=master)](https://travis-ci.org/kukiron/Revents) [![Codacy Badge](https://api.codacy.com/project/badge/Grade/45fef8b5a7674a7eb4240da934f545e1)](https://www.codacy.com/app/kukiron/Revents?utm_source=github.com&utm_medium=referral&utm_content=kukiron/Revents&utm_campaign=Badge_Grade)

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

You need to set up a project in firebase & in Google for this repo to function properly. Use the Google API key & Firebase config object from respective developer consoles & create file `./src/app/config/firebase.js`.

```javascript
// Firebase configuration from dev console
firebaseConfig: {
  apiKey: "....",
  authDomain: "....",
  databaseURL: "....",
  projectId: "....",
  storageBucket: "....",
  messagingSenderId: "...."
}
```
