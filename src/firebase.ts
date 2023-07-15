import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyByr6vfPscujiB4zfyPlmO4_WYhR7JPeh0",
  authDomain: "carfest-9bd76.firebaseapp.com",
  projectId: "carfest-9bd76",
  storageBucket: "carfest-9bd76.appspot.com",
  messagingSenderId: "189322879065",
  appId: "1:189322879065:web:788bc592baf4b6c9981148",
  measurementId: "G-QR2WFL28B6",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
