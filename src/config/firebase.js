import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyBBUD2E92khxmJpH-z8bnMULEKYnQXPx0M",
  authDomain: "todogo-de6ec.firebaseapp.com",
  projectId: "todogo-de6ec",
  storageBucket: "todogo-de6ec.appspot.com",
  messagingSenderId: "755043516368",
  appId: "1:755043516368:web:015db76b54e52d683b43d5"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);