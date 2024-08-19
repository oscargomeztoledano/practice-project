import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBBDcJRZgdsNuPWvt6_-ZMmW6KlXdyqNoU",
  authDomain: "practice-project-fac82.firebaseapp.com",
  projectId: "practice-project-fac82",
  storageBucket: "practice-project-fac82.appspot.com",
  messagingSenderId: "810663316169",
  appId: "1:810663316169:web:fe796bfad51d2e1d7b1b18",
  measurementId: "G-YP3H5MGNW9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, GoogleAuthProvider, signInWithPopup };