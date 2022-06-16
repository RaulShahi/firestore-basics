// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyBPfJwJU6uc3pixaCT9LNLSY5tkgNgqB_A",
  authDomain: "firestore-basics-88420.firebaseapp.com",
  projectId: "firestore-basics-88420",
  storageBucket: "firestore-basics-88420.appspot.com",
  messagingSenderId: "537428178335",
  appId: "1:537428178335:web:4b279466772bf43c94b9aa",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
