import { initializeApp } from "@firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCmBbAJqMHq7N4pWclIlT-QpxSXZFZCQyk",
    authDomain: "employeeperormanceprediction.firebaseapp.com",
    projectId: "employeeperormanceprediction",
    storageBucket: "employeeperormanceprediction.appspot.com",
    messagingSenderId: "221936982996",
    appId: "1:221936982996:web:d717aafa25e495984e1441",
    measurementId: "G-RG5168Q2QG"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth }
