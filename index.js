var express = require("express");
var app = express();
var path = require("path");
var port = process.env.PORT || 3000;
var morgan = require("morgan");
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var router = express.Router();
var ejs = require("ejs");
var passport  = require("passport");
var flash = require("connect-flash");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var Twit = require('twit')

var ml = require('machine_learning');
app.use(morgan('dev'));

var dbURI = 'mongodb://localhost:27017/teamie';
mongoose.Promise = global.Promise;
mongoose.connect(dbURI,function(err)
	{
		if(err)
          {
          	console.log("error");
          }
          else{
          	console.log("successfully connected");
          }
	});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.use(cookieParser());
app.set('view engine','ejs');
app.use(session({secret: 'mySecretKey',saveUninitialized: true,resave:true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
require('./config/passport.js')(passport);
 require('./app/route.js')(app,passport,Twit);
 require('./app/data/data.js')(app,ml,Twit);



app.use(express.static('./public'));
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

app.get('/',function(req,res)
{
	res.render(__dirname + '/ejs/login.ejs');
});
app.listen(port);
console.log("server is running on port "+port);

exports = module.exports = app;