// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBsnwAAG6uZCFCCfViaeK8DUlVD0ORlZrI",
  authDomain: "useravatar-1d43b.firebaseapp.com",
  projectId: "useravatar-1d43b",
  storageBucket: "useravatar-1d43b.appspot.com",
  messagingSenderId: "406010803443",
  appId: "1:406010803443:web:60283620532bfab2027386",
  measurementId: "G-TXFFSLGCWF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };