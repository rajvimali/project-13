
// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { initializeApp } from "firebase/app";

import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyDj03JSQQegPHa50lmwU2tNU3MMnxPQ69w",
    authDomain: "labportalrajvi.firebaseapp.com",
    databaseURL: "https://labportalrajvi-default-rtdb.firebaseio.com",
    projectId: "labportalrajvi",
    storageBucket: "labportalrajvi.appspot.com",
    messagingSenderId: "851485721816",
    appId: "1:851485721816:web:41cc19d29559f34887c3ad",
    measurementId: "G-QF9MRX55FR"
};

firebase.initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
export { database, app };

export const auth = firebase.auth();