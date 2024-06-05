// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore, collection } from "firebase/firestore";
// import { getAuth } from "firebase-admin/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJKOYQ4Ci03CRoiOKF93BPdrxX-OWG8-0",
  authDomain: "chatbox-35178.firebaseapp.com",
  projectId: "chatbox-35178",
  storageBucket: "chatbox-35178.appspot.com",
  messagingSenderId: "136992896981",
  appId: "1:136992896981:web:ad70bd15f7fac87541af5c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
});

export const db = getFirestore(app);

export const usersRef = collection(db, "users");
export const roomsRef = collection(db, "rooms");
