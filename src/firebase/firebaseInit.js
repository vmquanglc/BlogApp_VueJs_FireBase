import firebase from "firebase/app";
import "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZbtfiK8NQXzKRfVIhPidavSW_83flqm4",
  authDomain: "blogsvuefirebase-c087c.firebaseapp.com",
  projectId: "blogsvuefirebase-c087c",
  storageBucket: "blogsvuefirebase-c087c.appspot.com",
  messagingSenderId: "197131445951",
  appId: "1:197131445951:web:9ced4a88cabf4ccdb3080a"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { timestamp };
export default firebaseApp.firestore();
