import React, { useState } from 'react';
import './Home.css';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';


if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app();
}

function Home() {
    const [user, setUser] = useState({});
    const google = new firebase.auth.GoogleAuthProvider();
    const facebook = new firebase.auth.FacebookAuthProvider();
    const github = new firebase.auth.GithubAuthProvider();

    const googleSignIn = () => {
        console.log('Clicked');
        firebase.auth()
            .signInWithPopup(google)
            .then((result) => {
                const credential = result.credential;
                const token = credential.accessToken;
                const user = result.user;
                console.log(user);
                setUser(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.email;
                const credential = error.credential;
                console.log(errorCode);
            });
    };
    const facebookSignIn = () => {
        console.log('Facebook Clicked')
        firebase
            .auth()
            .signInWithPopup(facebook)
            .then((result) => {
                var credential = result.credential;
                var user = result.user;
                var accessToken = credential.accessToken;
                console.log('faecbook', user);
                setUser(user);
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                var credential = error.credential;
                console.log('faecbook', errorCode);
            });
    };
    const githubSignIn = () => {
        console.log('Github Clicked');
        firebase
            .auth()
            .signInWithPopup(github)
            .then((result) => {
                var credential = result.credential;
                var token = credential.accessToken;
                var user = result.user;
                console.log('Github', user);
                setUser(user);
            }).catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                var credential = error.credential;
                console.log('Github', errorCode);
            });
    }
    return (
        <div>
            <button onClick={googleSignIn}>Google Login</button>
            <button onClick={facebookSignIn}>Facebook Login</button>
            <button onClick={githubSignIn}>Github Login</button>
            <h3>Name: {user.displayName}</h3>
            <h3>Email: {user.email}</h3>
            <img src={user.photoURL} alt="" />
        </div>
    );
};

export default Home;