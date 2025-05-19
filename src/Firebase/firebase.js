// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCvoaxX8zdtVTsFmP6KU5jeg46THH1OrB0",
  authDomain: "ferrous-osprey-453310-c4.firebaseapp.com",
  projectId: "ferrous-osprey-453310-c4",
  storageBucket: "ferrous-osprey-453310-c4.firebasestorage.app",
  messagingSenderId: "584311092618",
  appId: "1:584311092618:web:c7621e111b73d5c3d88473",
  measurementId: "G-1GEC5BDCCG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth };