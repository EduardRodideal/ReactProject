import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = firebase.initializeApp({    
    apiKey: "AIzaSyByaaUo3Ih9QeQZyP8FQxONeq28inavC58",
    authDomain: "todoist-roditor.firebaseapp.com",
    databaseURL: "https://todoist-roditor.firebaseio.com",
    projectId: "todoist-roditor",
    storageBucket: "todoist-roditor.appspot.com",
    messagingSenderId: "173907715898",
    appId: "1:173907715898:web:38852586bb2a1eb3ad5203"
});
//jllFXlwyAL3tzHMtzRbw

export {firebaseConfig as firebase};