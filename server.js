require('dotenv').config()

var express = require('express');
var app = express();

var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var passport = require('passport');

app.set('view engine', 'ejs');

const port = process.env.PORT || 3000;
mongoose.connect(process.env.MONGODB_URL, () => {
	console.log('connect db')
});

require('./config/passport')(passport);

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(session({
	secret: process.env.SESSION_SECRET,
	saveUninitialized: true,
	resave: true
}));

app.use(passport.initialize());
app.use(passport.session());


app.use(function (req, res, next) {
	next();
});

require('./routes.js')(app, passport);

app.listen(port, () => {
	console.log('server 9000');
});




