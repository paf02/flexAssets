var express = require('express');
var wagner = require('wagner-core');
var api = require('./api');
var models = require('./models');
var config = require('./config');

models(wagner);

var app = express();

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use(express.static(config.publicAccess));

app.use('/api/' + config.apiVersion, api(wagner));

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/view/modifyProduct.html');
});


app.get('/sss', function(req, res) {
    res.send('s');
});


// app.set('view engine', 'jade');
// app.set('views','../frontend/dist');
// app.get('/test/:id', function(req, res) {
// 	res.send(req.params.id)
// });
// app.get('/', function(req, res) {
// 	// res.render('index', {hola: 'tons q carepi'});
// 	// res.render('index.html');
// 	res.sendFile(__dirname + '/index.html');
// });

app.listen(3000);
console.log('Listen on port 3000!');