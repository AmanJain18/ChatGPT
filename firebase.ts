import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

//* Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyDPy0SSSkARmrk7EI-q96XquykndW_XwUs",
  authDomain: "chatgptcloneai.firebaseapp.com",
  projectId: "chatgptcloneai",
  storageBucket: "chatgptcloneai.appspot.com",
  messagingSenderId: "183817605348",
  appId: "1:183817605348:web:8a90c45b232288a1efdcf1"
};

// ? Initialize Firebase

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };