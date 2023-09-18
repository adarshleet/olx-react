// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAHbrrTgBc2M1q2qgao1HCGr0UVw_7FJWQ",
  authDomain: "olx-clone-ec029.firebaseapp.com",
  projectId: "olx-clone-ec029",
  storageBucket: "olx-clone-ec029.appspot.com",
  messagingSenderId: "93420681508",
  appId: "1:93420681508:web:b12cf54290e016fee09bb1",
  measurementId: "G-QL3819ZR8L"
};

// Initialize Firebase
export const Firebase = initializeApp(firebaseConfig);
const analytics = getAnalytics(Firebase);
export const auth = getAuth(Firebase);