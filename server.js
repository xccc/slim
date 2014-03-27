var express = require('express'),
app = express(),
passport = require('passport'),
mongoose = require('mongoose'),
router = require('./router');
socket = require('socket.io').listen(app.listen(8000));


mongoose.connect('mongodb://localhost:27017/nodetest1');


	


console.log(__dirname);


app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.static(__dirname + '/public'));
app.use(express.session({ secret: 'laalkfwofw', cookie:  {
	securet: true,
	maxAge: 20*60*1000 } } ));
app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');

router.route(app, passport);



	
	




	




