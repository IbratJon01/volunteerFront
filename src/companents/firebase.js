import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getStorage } from 'firebase/storage';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBFtCJxXYx5GLVjnnYMzKmTvHKaHi0x0a0",
  authDomain: "volunteer-8d954.firebaseapp.com",
  projectId: "volunteer-8d954",
  storageBucket: "volunteer-8d954.appspot.com",
  messagingSenderId: "821237682686",
  appId: "1:821237682686:web:99cf1cb98f960cb85370af",
  measurementId: "G-N0N9KYXFT7"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const db =getFirestore(app)
export {storage,auth,db} ;
