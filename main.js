var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();

app.get('/scrape', function (req, res){
	console.log(req['url'])
	res.end("This works!");
})

app.listen('9876');

console.log('Bizzam this works.');

exports = module.exports = app;