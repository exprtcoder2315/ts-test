// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCSetnABsDi6HVcGxfuAPYvjJrLtHTpKnM",
  authDomain: "quiz-4538f.firebaseapp.com",
  projectId: "quiz-4538f",
  storageBucket: "quiz-4538f.appspot.com",
  messagingSenderId: "481466148570",
  appId: "1:481466148570:web:8963dab788f5662f4867e3",
  measurementId: "G-R2LFSSTYJ1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export default app;