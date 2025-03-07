// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDqLrt22BYlIQMeOtsNqG0jpLTu5aLa24o",
  authDomain: "artificium-fd812.firebaseapp.com",
  projectId: "artificium-fd812",
  storageBucket: "artificium-fd812.firebasestorage.app",
  messagingSenderId: "378116540235",
  appId: "1:378116540235:web:3e7a5b0ac9c7197fe78ace",
  measurementId: "G-PB3LCRE4V9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//googleauth

const provider = new GoogleAuthProvider();

const auth = getAuth(app);
export const authWithGoogle = async () => {
  let user = null;

  await signInWithPopup(auth, provider)
    .then((result) => {
      user = result.user;
    })
    .catch((error) => {
      console.error("Error during sign-in with Google:", error);
    });

  return user;
};
