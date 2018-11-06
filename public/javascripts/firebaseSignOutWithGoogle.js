//Purpose : function sign out firebase for every method
//Params  : null
function signOutWithGoogle() {
    firebase.auth().signOut()
        .then(function () {
            removeDocument();
            removeSessionStorage();
            window.location.replace("/");
        })
        .catch(function (error) {
            console.log(error);
        });
}

//Purpose : function to remove data that showed in browser after login
//Params  : null
function removeDocument ()
{
    document.getElementById('google-display-name').innerText = '';
    document.getElementById('google-pic').src = '';
    document.getElementById('google-email').innerText = '';
    document.getElementById('sign-out-google').style.display = 'none';
}

//Purpose : function to remove session 
//Params  : null
function removeSessionStorage() 
{
    sessionStorage.removeItem('display_name_firebase');
    sessionStorage.removeItem('profile_picture_firebase');
    sessionStorage.removeItem('email_firebase');
    sessionStorage.removeItem('token_firebase');
}