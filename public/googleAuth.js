function googleSignIn() {
	if (!firebase.auth().currentUser) {
		var provider = new firebase.auth.GoogleAuthProvider();
		provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
		firebase.auth().signInWithPopup(provider).then(function(result) {
		    console.log(result.credential.idToken);
		    fillUserData(user);
		}).catch(function(error) {
			console.error(error);
		});	
	}
}

function initApp() {
	var db = firebase.firestore();
	firebase.auth().onAuthStateChanged(function(user) {
		if(user){
			fillUserData(user);
			document.getElementById('google-sign-in').style.display = "none";
		} else {
			document.getElementById('google-sign-in').style.display = "block";
			document.getElementById('profile-info').style.display = "none";
		}
	});

	db.collection("questions").doc("2JQfCNjwXMuKKyuvou7T")
    .onSnapshot((doc) => {
        console.log("Current data: ", doc.data());
    });

    db.collection("questions").where("question4", "==", null).get().then((querySnapshot)=>{
    	querySnapshot.forEach((doc) =>{
    		console.log(doc.id, " => ", doc.data());
    	});
    }).catch((error) => {
    	console.log("Error getting documents: ", error);
    });    
}

function signOut() {
	firebase.auth().signOut();
	document.getElementById('profile-info').style.display = "none";
	document.getElementById('user-name').innerHTML = 'You are not logged in yet';
	document.getElementById('google-sign-in').style.display = "block";
}

function fillUserData(user) {
	console.log(user);
	document.getElementById('user-name').innerHTML = user.email;
	document.getElementById('name').innerHTML = user.displayName;
	document.getElementById('email').innerHTML = user.email;
	document.getElementById('uid').innerHTML = user.uid;
	document.getElementById('profile-photo').src = user.photoURL;
	document.getElementById('profile-info').style.display = "block";
}