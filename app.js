//Template login page : 'https://bootsnipp.com/snippets/vl4R7'
//https://www.bootstrapdash.com/bootstrap-4-admin-templates/

require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var admin = require('firebase-admin');

var signInRouter = require('./routes/signIn');
var dashboardClientRouter = require('./routes/dashboardClient');
var dashboardServerRouter = require('./routes/dashboardServer');
var usersRouter = require('./routes/users');
var serviceAccount = require('./public/javascripts/trialnodejsfirebase-firebase-adminsdk-0go9w-f6beefd64e.json');

var firebaseAdmin = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://trialnodejsfirebase.firebaseio.com"
});

var app = express();

// authenticate middleware
function isAuthenticated(request, response, next)
{

}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', signInRouter);
app.use('/users', usersRouter);
app.use('/dashboard-client', dashboardClientRouter);
app.use('/dashboard-server', dashboardServerRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
