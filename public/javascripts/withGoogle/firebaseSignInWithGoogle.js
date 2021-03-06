//Purpose : function sign in with google email, method: pop up
//Params  : null
function signInWithGoogle()
{
    var googleAuthProvider = new firebase.auth.GoogleAuthProvider();

    googleAuthProvider.addScope('email');
    googleAuthProvider.setCustomParameters({
        'login_hint': 'user@example.com'
    });

    firebase.auth().signInWithPopup(googleAuthProvider)
        .then(function (data) {
            var accessToken = data.credential.accessToken;
            var idToken = data.credential.idToken;
            var user = data.user;
            var email   = user.email;
            var displayName = user.displayName;
            var profilePicture = user.photoURL;
            var userUid = user.uid;
            var style = 'block';

            //setDocument(displayName, profilePicture, email, style);
            setSessionStorage(email, accessToken, idToken, displayName, profilePicture, userUid);
            window.location.replace("/dashboard-client");
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

//Purpose ; function store session
//Params  : email, token
function setSessionStorage(email, accessToken, idToken, displayName, profilePicture, userUid)
{
    sessionStorage.setItem('display_name_firebase', displayName);
    sessionStorage.setItem('profile_picture_firebase', profilePicture);
    sessionStorage.setItem('email_firebase', email);
    sessionStorage.setItem('access_token_firebase', accessToken);
    sessionStorage.setItem('id_token_firebase', idToken);
    sessionStorage.setItem('uid_firebase', userUid);
}