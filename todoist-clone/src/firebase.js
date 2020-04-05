import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = firebase.initializeApp({
    apiKey: "AIzaSyDyTKrubyrQbNdPh4z9PsvemJAbuIXxoTI",
    authDomain: "roditor-todoist.firebaseapp.com",
    databaseURL: "https://roditor-todoist.firebaseio.com",
    projectId: "roditor-todoist",
    storageBucket: "roditor-todoist.appspot.com",
    messagingSenderId: "128948902983",
    appId: "1:128948902983:web:ee212f06bb219f18d8a562"
});

export { firebaseConfig as firebase };
