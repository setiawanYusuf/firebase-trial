document.addEventListener("DOMContentLoaded", function (e) {
    firebase.initializeApp(config);
    checkSessionStorage();
});

//Purpose : check if sessionStorage is not empty or if login == true
//Params  : null
function checkSessionStorage()
{
    var email_firebase = sessionStorage.getItem('email_firebase');
    var access_token_firebase = sessionStorage.getItem('access_token_firebase');
    var id_token_firebase = sessionStorage.getItem('id_token_firebase');
    var display_name_firebase = sessionStorage.getItem('display_name_firebase');
    var profile_picture_firebase = sessionStorage.getItem('profile_picture_firebase');
    var uid_firebase = sessionStorage.getItem('uid_firebase');

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            if (user.uid == uid_firebase) {
                if ((email_firebase !== null) && (access_token_firebase !== null) && (id_token_firebase !== null) && (display_name_firebase !== null) && (profile_picture_firebase !== null) && (uid_firebase !== null)) {
                    console.info(user);
                    setDocument(display_name_firebase, profile_picture_firebase, email_firebase, 'block');
                } 
            }
        } else {
            console.info("Noone is signed in.");
            var currentUrl = window.location.href;
            switch (currentUrl.length) {
                case 22:
                    break;
                default:
                    window.location.replace("/");
                    break;
            }
        }
    });
}

//Purpose : function to show data after login
//Params  : displayName, profilePicture, email, style
function setDocument(displayName, profilePicture, email, style) 
{
    console.info(displayName + ' # ' + profilePicture + ' # ' + email + ' # ' + style);

    document.getElementById('google-display-name').innerText = displayName;
    document.getElementById('google-pic').src = profilePicture;
    document.getElementById('google-email').innerHTML = email;
    document.getElementById('sign-out-google').style.display = style;
}