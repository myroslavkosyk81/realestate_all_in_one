// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-7f0dd.firebaseapp.com",
  projectId: "real-estate-7f0dd",
  storageBucket: "real-estate-7f0dd.appspot.com",
  messagingSenderId: "698415888588",
  appId: "1:698415888588:web:3a429360c9baa3996fea69"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);