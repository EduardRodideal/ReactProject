import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = firebase.initializeApp({
    apiKey: "AIzaSyD1krxKYSzcAc8Nuho7nEOEJXhZeEr7rSI",
    authDomain: "roditor-todo.firebaseapp.com",
    databaseURL: "https://roditor-todo.firebaseio.com",
    projectId: "roditor-todo",
    storageBucket: "roditor-todo.appspot.com",
    messagingSenderId: "143554232070",
    appId: "1:143554232070:web:867236415f6fa4a4e16887"
});

export { firebaseConfig as firebase };
