// Firebase/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Only need getAuth here

const firebaseConfig = {
  apiKey: "AIzaSyCvoaxX8zdtVTsFmP6KU5jeg46THH1OrB0",
  authDomain: "ferrous-osprey-453310-c4.firebaseapp.com",
  projectId: "ferrous-osprey-453310-c4",
  storageBucket: "ferrous-osprey-453310-c4.firebasestorage.app",
  messagingSenderId: "584311092618",
  appId: "1:584311092618:web:3f9925348dbba27cd88473",
  measurementId: "G-BR17BQL3JR"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);

// Export only the initialized instances (app and auth)
export { app, auth };