import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAZGU8tdqFko1frlpejt2TMqZg92QzdiCs",
  authDomain: "lenda-c920c.firebaseapp.com",
  projectId: "lenda-c920c",
  storageBucket: "lenda-c920c.appspot.com",
  messagingSenderId: "831808331011",
  appId: "1:831808331011:web:660af0e652958618ac9d36",
  measurementId: "G-M151GL9KYM",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
