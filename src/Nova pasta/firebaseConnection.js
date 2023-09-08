// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBXJ7w2IuU68HnCIzjosL2uFodWOI95qwM",
  authDomain: "banco-dados-react-3c011.firebaseapp.com",
  projectId: "banco-dados-react-3c011",
  storageBucket: "banco-dados-react-3c011.appspot.com",
  messagingSenderId: "240576104445",
  appId: "1:240576104445:web:7f1d1932f8e066cf023b94"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);  

export {db, auth};