// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCUpZJ59-Sb2kBNW7IjViO9F1RaWHV0-w8",
  authDomain: "e-shop-v-fd7bc.firebaseapp.com",
  projectId: "e-shop-v-fd7bc",
  storageBucket: "e-shop-v-fd7bc.firebasestorage.app",
  messagingSenderId: "80702189268",
  appId: "1:80702189268:web:a785c7d45798f22ef51541"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp