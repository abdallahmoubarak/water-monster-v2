// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAAyvCmJW8tUMLwGZTbVQ2CDu1EvoF6vXw",
  authDomain: "fir-23b21.firebaseapp.com",
  projectId: "fir-23b21",
  storageBucket: "fir-23b21.appspot.com",
  messagingSenderId: "734550072056",
  appId: "1:734550072056:web:b895450b17c3429f73790d",
  measurementId: "G-SCXWD3KCJ2"
};


const firebaseApp = initializeApp(firebaseConfig);
export default firebaseApp;