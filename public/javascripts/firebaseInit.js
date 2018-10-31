firebase.initializeApp(config);

checkSessionStorage();

//Purpose : check if sessionStorage is not empty
//Params  : null
function checkSessionStorage()
{
    var email_firebase = sessionStorage.getItem('email_firebase');
    var token_firebase = sessionStorage.getItem('token_firebase');
    var display_name_firebase = sessionStorage.getItem('email_firebase');
    var profile_picture_firebase = sessionStorage.getItem('profile_picture_firebase');

    if ((email_firebase !== null) && (token_firebase !== null) && (display_name_firebase !== null) && (profile_picture_firebase !== null) ) {
        setDocument(display_name_firebase, profile_picture_firebase, email_firebase, 'block');
    }
}

//Purpose : function to show data after login
//Params  : displayName, profilePicture, email, style
function setDocument(displayName, profilePicture, email, style) 
{
    alert(displayName + ' ' + profilePicture + ' ' + email + ' ' + style);

    document.getElementById('google-display-name').innerText = displayName;
    document.getElementById('google-pic').src = profilePicture;
    document.getElementById('google-email').innerText = email;
    document.getElementById('sign-out-google').style.display = style;
}