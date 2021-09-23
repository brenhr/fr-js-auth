// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

const firebaseConfig = {
	apiKey: "AIzaSyB0uCLs23fFUjOE8MjPSXhASCA4qcHxlrw",
	authDomain: "fr-test-auth.firebaseapp.com",
	projectId: "fr-test-auth",
	storageBucket: "fr-test-auth.appspot.com",
	messagingSenderId: "485692940978",
	appId: "1:485692940978:web:deb9e2dbb5336238bb1fab"
};
// Initialize Firebase

const app = initializeApp(firebaseConfig);

function googleSignIn() {
	if (!firebase.auth().currentUser) {
		var provider = new firebase.auth.GoogleAuthProvider();
		provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
		firebase.auth().signInWithPopup(provider).then(function(result) {
			var credential = result.credential;
		    var token = result.credential.accessToken;
		    var user = result.user;
		    console.log(result.credential);
		    console.log(result.user);
		}).catch(function(error) {
			console.error(error);
		});	
	}
}

function initApp() {
	firebase.auth().onAuthStateChanged(function(user) {
		if(user){
			console.log(user);
		} else {
			console.log("User is not signed in");
		}
	});
}
