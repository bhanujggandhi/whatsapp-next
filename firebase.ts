import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDfwRg7uONOl7E5Yk5eu0hdyyESCbaGMM0",
  authDomain: "whatsapp-clone-mern-9999.firebaseapp.com",
  databaseURL: "https://whatsapp-clone-mern-9999.firebaseio.com",
  projectId: "whatsapp-clone-mern-9999",
  storageBucket: "whatsapp-clone-mern-9999.appspot.com",
  messagingSenderId: "164075684791",
  appId: "1:164075684791:web:f1bdbe338c2ea5ad3ede32",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
