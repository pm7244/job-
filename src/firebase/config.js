import app from 'firebase/app';
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCUvgkn59fmkiwwexUFJTVM1u6riPzC0Ig",
    authDomain: "job-listing-4185c.firebaseapp.com",
    projectId: "job-listing-4185c",
    storageBucket: "job-listing-4185c.appspot.com",
    messagingSenderId: "710476554482",
    appId: "1:710476554482:web:b89702d5b44a8d79d1f06b"
  };

  // Initialize Firebase
const firebase = app.initializeApp(firebaseConfig);

const firestore = firebase.firestore();

export{ firebase,firestore,app};