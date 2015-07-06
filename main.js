var express = require('express');
var request = require('request');
var url     = require('url');

var Scraper = require('./lib/scraper.js');
var scraper = new Scraper();

var app = express();

app.get('/', function (req, res){

	//get all URL data from the request, then parse out the query string argument.
	url_data = url.parse(req.url, true);
	url_query = String(url_data['query']['url']);

	console.log(url_query);

	//make the actual request.  This only needs to happen once
	request(String(url_query), function(error, response, html){
		if (!error) {

			scraper.scrape_metadata(html);
			scraper.scrape_html(html);

			res.end("Ok")

		} else {
			console.log(error);
		}
	});
});

app.listen('9876');

console.log('Scraper is now listening on port 9876...\n');

exports = module.exports = app;
