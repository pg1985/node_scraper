function Scraper () {
	this.fs 	 = require('fs');
	this.cheerio = require('cheerio');
}

Scraper.prototype.scrape_metadata = function (html) {
	var return_data = {};
	var has_meta_data = false;
	var $ = this.cheerio.load(html);

	$('meta').each(function(i, obj){
		meta_tag = $(this)['0'];
		attrib = meta_tag['attribs'];
		if (attrib['name'] === "og:title" || attrib['name'] === "og:description")
			return_data[attrib['name']] = attrib['content']

		if (attrib['property'] === "og:image")
			return_data[attrib['property']] = attrib['content']

	});

	console.log(return_data)

	if(has_meta_data) {
		return return_data;
	} else
		return false;
};

Scraper.prototype.scrape_html = function (html) {
	console.log("Scrape html");

	var $ = this.cheerio.load(html);	
	$('body').filter(function(){

	});
};

module.exports = Scraper;