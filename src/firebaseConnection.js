import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


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
