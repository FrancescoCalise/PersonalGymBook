// src/firebase-config.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyB27CE_lOHNyC3MtgnWU-hdWJlabJZFPfw",
    authDomain: "personalgymbook.firebaseapp.com",
    projectId: "personalgymbook",
    storageBucket: "personalgymbook.appspot.com",
    messagingSenderId: "730757104220",
    appId: "1:730757104220:web:a25fc90f977ad383371c99",
    measurementId: "G-8092BY6Y3G"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
