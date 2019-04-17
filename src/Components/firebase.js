import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

const config = {
    apiKey: "AIzaSyCDzr_5vIX5QMcNq5uueaOuLW_zVz5pvWQ",
    authDomain: "react-slack-c3768.firebaseapp.com",
    databaseURL: "https://react-slack-c3768.firebaseio.com",
    projectId: "react-slack-c3768",
    storageBucket: "react-slack-c3768.appspot.com",
    messagingSenderId: "444539515823"
};
firebase.initializeApp(config);

export default firebase;