import firebase from "firebase/app";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCD6Q57bLOt5Bqzs9iJQM0nVZaGjImMrTg",
  authDomain: "movie-vote-e2d81.firebaseapp.com",
  databaseURL: "https://movie-vote-e2d81.firebaseio.com",
  projectId: "movie-vote-e2d81",
  storageBucket: "movie-vote-e2d81.appspot.com",
  messagingSenderId: "813095662762",
  appId: "1:813095662762:web:31d9582c970f309c98ccd3",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
