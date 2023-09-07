// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBQNvSvhGh2OWvcpSdPTMkfBBwN4JWd11o",
  authDomain: "notas-df403.firebaseapp.com",
  projectId: "notas-df403",
  storageBucket: "notas-df403.appspot.com",
  messagingSenderId: "475724261402",
  appId: "1:475724261402:web:0564dc7297d67c424889a3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
