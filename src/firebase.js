import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
    apiKey: "AIzaSyBP-d9ud61Vi43lm_1DyZN0LcLjmFnBqTk",
    authDomain: "capstone-project-bf495.firebaseapp.com",
    projectId: "capstone-project-bf495",
    storageBucket: "capstone-project-bf495.appspot.com",
    messagingSenderId: "302512745630",
    appId: "1:302512745630:web:3b6ceef1708bd617f91f8f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);