// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCiU_MnedjH9vhbPHceZU5Q1-ySFxJTTJo",
  authDomain: "todo-692f7.firebaseapp.com",
  projectId: "todo-692f7",
  storageBucket: "todo-692f7.firebasestorage.app",
  messagingSenderId: "490441554973",
  appId: "1:490441554973:web:74d606eec630d2b7d49af4"
};

// Initialize Firebase
// const app =
initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();

