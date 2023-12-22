// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCZkTeg5r7fWbLvmJo3BHy-s1i4xGJs4WE",
  authDomain: "smackchat-b56bb.firebaseapp.com",
  projectId: "smackchat-b56bb",
  storageBucket: "smackchat-b56bb.appspot.com",
  messagingSenderId: "950764834326",
  appId: "1:950764834326:web:590782fc269c7e75bd2f37",
  databaseURL:
    "https://smackchat-b56bb-default-rtdb.asia-southeast1.firebasedatabase.app",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const firebaseDB = getDatabase(firebaseApp);

export { firebaseAuth, firebaseDB };
