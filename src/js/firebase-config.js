import firebase from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyD4YpyFameyN-vur5feYE989hb6VpxmNos",
  authDomain: "socialar-9a0d4.firebaseapp.com",
  databaseURL:
    "https://socialar-9a0d4-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "socialar-9a0d4",
  storageBucket: "socialar-9a0d4.appspot.com",
  messagingSenderId: "236737913974",
  appId: "1:236737913974:web:31fe2c2f8b3ba475eb6b57",
  measurementId: "G-XJLY1GV226",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
export { firebase };
