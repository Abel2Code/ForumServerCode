var express  = require('express');
var app      = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var server = require('http').createServer(app);

var port = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost/ForumExample');

app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));

app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
});

const forumRoute = require('./routes/forum');

app.use('/api', forumRoute);

app.listen(port);
console.log("App listening on port " + port);

