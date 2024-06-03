// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth}from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBXUDRovgHjNDiQCcyhILGQhibOxJ3GyaM",
  authDomain: "ecomerce-e2f78.firebaseapp.com",
  projectId: "ecomerce-e2f78",
  storageBucket: "ecomerce-e2f78.appspot.com",
  messagingSenderId: "482126141914",
  appId: "1:482126141914:web:aeb2d0fcc1e57b5c3248e3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export default auth;