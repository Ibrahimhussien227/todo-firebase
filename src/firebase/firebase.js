// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyANdK08W6VAM7nlzUBbev9E4SLKhViG_qM",
  authDomain: "todo-app-7268b.firebaseapp.com",
  projectId: "todo-app-7268b",
  storageBucket: "todo-app-7268b.appspot.com",
  messagingSenderId: "910659471256",
  appId: "1:910659471256:web:de6ce15d052b8660648ded",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
