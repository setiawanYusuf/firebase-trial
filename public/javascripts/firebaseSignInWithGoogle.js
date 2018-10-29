//Purpose : function sign in with google email, method: pop up
//Params  : null
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
            var style = 'block';

            setDocument(displayName, profilePicture, email, style);

            console.info("Data User: " + data.user);
            console.info("Token: " + token);
        })
        .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;

            console.error("Error Code: " +errorCode);
            console.error("Error Message: " +errorMessage);
            console.error("Error Email: " +email);
            console.error("Error Credential: " +credential);
        });
}

//Purpose : function to show data after login
//Params  : displayName, profilePicture, email, style
function setDocument (displayName, profilePicture, email, style) 
{
    document.getElementById('google-display-name').innerText = displayName;
    document.getElementById('google-pic').src = profilePicture;
    document.getElementById('google-email').innerText = email;
    document.getElementById('sign-out-google').style.display = style;
}
