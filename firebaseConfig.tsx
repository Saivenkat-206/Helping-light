// src/firebaseConfig.tsx
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyASYBsZKY63N6zZqtcilcaOGtWJjkGzFYg",
  authDomain: "helping-8d55a.firebaseapp.com",
  projectId: "helping-8d55a",
  storageBucket: "helping-8d55a.appspot.com",
  messagingSenderId: "891127488328",
  appId: "1:891127488328:web:3230752b38a3f988c75d7d",
  measurementId: "G-BC1DRWTP78" // corrected to measurementId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Firebase Authentication (optional, if you need it)
export const auth = getAuth(app);
