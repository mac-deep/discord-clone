import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyAf1vMBCasVcboJQ4mAgqat-u7mogR6PP4",
  authDomain: "discord-44138.firebaseapp.com",
  projectId: "discord-44138",
  storageBucket: "discord-44138.appspot.com",
  messagingSenderId: "391288589931",
  appId: "1:391288589931:web:bc19db6a3aed902aaaab2e"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
