var express = require('express');
var app = express();
var path = require('path')

app.get('/', function(req,res) {
	res.sendFile(path.join(__dirname + '/html/Untitled-1.html'))
});

app.get('/style.css', function(req,res) {
	res.sendFile(path.join(__dirname + '/html/style.css'))
});

app.listen(5000, '172.26.9.56');
