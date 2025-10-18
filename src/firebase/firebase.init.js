// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBxkQzUbtfDnGIbgjIp8hV6RgTwxowCIjA",
  authDomain: "email-password-auth-32259.firebaseapp.com",
  projectId: "email-password-auth-32259",
  storageBucket: "email-password-auth-32259.firebasestorage.app",
  messagingSenderId: "353974749855",
  appId: "1:353974749855:web:b1400f8ee785a4f8c430aa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);