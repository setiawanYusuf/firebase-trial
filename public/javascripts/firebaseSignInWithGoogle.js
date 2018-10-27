function signInWithGoogle(){
    var googleAuthProvider = new firebase.auth.GoogleAuthProvider();

    googleAuthProvider.addScope('email');
    googleAuthProvider.setCustomParameters({
        'login_hint': 'user@example.com'
    });

    firebase.auth().signInWithPopup(googleAuthProvider)
        .then(function (data) {
            var token = data.credential.accessToken;
            var user = data.user;
            var email   = user.email;
            var displayName = user.displayName;
            var profilePicture = user.photoURL;

            document.getElementById('google-display-name').innerText = displayName;
            document.getElementById('google-pic').src = profilePicture;
            document.getElementById('google-email').innerText = email;
            document.getElementById('sign-out-google').style.display = 'block';

            console.info(data.user);
            console.info(token);
        })
        .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;

            console.error(errorCode);
            console.error(errorMessage);
            console.error(email);
            console.error(credential);
        });
}
