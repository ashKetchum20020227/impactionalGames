// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBC9YFzorUkq_mDK8PCo4IsboqeCZcNzQ4",
  authDomain: "igames-9d369.firebaseapp.com",
  projectId: "igames-9d369",
  storageBucket: "igames-9d369.appspot.com",
  messagingSenderId: "379168972193",
  appId: "1:379168972193:web:97a6c06c0858f9e8d63fe0",
  measurementId: "G-XBZFRW5GG0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);