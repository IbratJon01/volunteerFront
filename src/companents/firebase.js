import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getStorage } from 'firebase/storage';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyASDp95fQ1lhuV3J9GFzD5TV2T4_t9-0TQ",
  authDomain: "social-media-5b459.firebaseapp.com",
  projectId: "social-media-5b459",
  storageBucket: "social-media-5b459.appspot.com",
  messagingSenderId: "451063028382",
  appId: "1:451063028382:web:89af9815c00be3b179b98f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const db =getFirestore(app)
export {storage,auth,db} ;
