function signOutWithGoogle() {
    firebase.auth().signOut()
        .then(function () {
            console.log('Signed Out');
        })
        .catch(function (error) {
            console.log(error);
        });
}
