// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCCoXD9DDxlCPkTWJpjE4KQlVjiFQ_0En8",
  authDomain: "ecommerce-47b5b.firebaseapp.com",
  projectId: "ecommerce-47b5b",
  storageBucket: "ecommerce-47b5b.appspot.com",
  messagingSenderId: "452997414885",
  appId: "1:452997414885:web:de9266b5902951dc9db90c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app