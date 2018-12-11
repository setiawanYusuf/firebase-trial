var express = require('express');
var router = express.Router();
var admin = require('firebase-admin');

var serviceAccount = require('../public/javascripts/trialnodejsfirebase-firebase-adminsdk-0go9w-f6beefd64e.json');

var firebaseAdmin = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://trialnodejsfirebase.firebaseio.com"
});
var database = firebaseAdmin.database();

var restaurantsRef = database.ref("/restaurants");

/* GET home page. */
router.get('/', function (req, res, next) {
    restaurantsRef.once('value', function (snapshot) {
        var data = snapshot.val();
        if (!data) {
            data = {};
        }
        res.render('dashboardClient', { title: 'Welcome', restaurants: data });
    });
});

module.exports = router;
