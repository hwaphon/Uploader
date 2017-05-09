var express = require('express');
var app = express();
var path = require('path');
var formidable = require('formidable');
var fs = require('fs');

app.use(express.static( path.join( __dirname, 'public' )));

app.get( '/', function( req, res) {
	res.sendFile(path.join( __dirname, 'views/index.html'));
});

app.post('/upload', function(req, res) {
	var form = new formidable.IncomingForm();
	form.multiples = true;
	form.uploadDir = path.join(__dirname, 'uploads');

	form.on('file', function(filed, file) {
		fs.rename(file.path, path.join(form.uploadDir, file.name));
	});

	form.on('error', function(error) {
		console.log(error);
	});

	form.on('end', function() {
		console.log('success!');
	});

	form.parse(req);
});

app.listen( 8888, function( req, res ) {
	console.log('app is running at 8888');
});