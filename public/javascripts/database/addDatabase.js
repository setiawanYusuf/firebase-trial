function addRestaurant()
{
    var database = firebase.database();
    var restaurantRef = database.ref('/restaurants');
    var restaurantInput = document.getElementById('add-restaurant');
    var restaurantName = restaurantInput.value.toLowerCase();
    restaurantInput.value = '';

    restaurantRef.push({
        name: restaurantName,
        votes: 0
    }, function(error){
        if (error) {

        } else {
            window.location.reload();
            document.getElementById('label-notification').innerHTML = jsUcfirst(restaurantName) + ' has been submited'
            hideLabel(2);
        }
    });
}

function jsUcfirst(string) 
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function hideLabel(seconds) {
    setTimeout(function () {
        document.getElementById("label-notification").innerHTML = "";
    }, seconds * 1000);
};

function upVote(key)
{
    var database = firebase.database();
    var user = firebase.auth().currentUser;
    var userId = user.uid;
    var userDisplayName = user.displayName;

    //var restaurantVotesRef = database.ref('/restaurants/'+ key + '/votes/' + userId);
    var restaurantVotesRef = database.ref('/restaurants/')
                                .child(key)
                                .child('/votes') 
                                .child(userId);

    restaurantVotesRef.push(userDisplayName)
                        .then(function(){
                            window.location.reload();
                        })
                        .catch(function(err){
                            console.log(err);
                        });
}

function downVote(key)
{
    var database = firebase.database();
    var user = firebase.auth().currentUser;
    var userId = user.uid;

    var restaurantVotesRef = database.ref('/restaurants/')
                                .child(key)
                                .child('/votes')
                                .child(userId);

    restaurantVotesRef.remove()
                        .then(function(){
                            window.location.reload();
                        })
                        .catch(function(err){
                            console.log(err);
                        });
}
