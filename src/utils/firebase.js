// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD41xVwrRKIBuPlX-EtKGZSHR-wXFTCtm8",
  authDomain: "netflixgpt-18039.firebaseapp.com",
  projectId: "netflixgpt-18039",
  storageBucket: "netflixgpt-18039.appspot.com",
  messagingSenderId: "1013985728164",
  appId: "1:1013985728164:web:5ad6879337e9d91f177831",
  measurementId: "G-YEWS807TKR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
