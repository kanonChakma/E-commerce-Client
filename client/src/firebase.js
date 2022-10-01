import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDwxdaYnqdBlCVVxjZxl4WYSr7pba25z2U",
    authDomain: "ecommerce-4926f.firebaseapp.com",
    projectId: "ecommerce-4926f",
    storageBucket: "ecommerce-4926f.appspot.com",
    messagingSenderId: "1062643619024",
    appId: "1:1062643619024:web:cc4a105c2c94d0ce977ad5"
  };

  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
