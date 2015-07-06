function Scraper () {
	this.fs 	 = require('fs');
	this.cheerio = require('cheerio');
}

Scraper.prototype.scrape_metadata = function (html) {
	var return_data = {};
	var has_meta_data = false;
	var $ = this.cheerio.load(html);
	var meta_providers = [["og:description", "og:title", "og:image"],
						  ["twitter:description", "twitter:title", "twitter:image:src"],
						  ["description", "title", "image"]];

	meta_tags = $('head').children('meta');

	console.log(meta_tags);

	$('meta').filter(function(i, obj){
		meta_tag = $(this);
		attrib = meta_tag[i]['attribs'];
		if(attrib !== undefined)
			console.log(attrib);

	});



		// if (   attrib['name'] === "og:description" 
		// 	|| attrib['name'] === "twitter:description" 
		// 	|| attrib['itemprop'] === "description" 
		// 	|| attrib['name'] === "description") {
		// 		return_data['description'] = attrib['content']
		// 		has_meta_data = true;
		// }

		// if (   attrib['name'] === "subject"
		// 	|| attrib['name'] === "og:title"
		// 	|| attrib['name'] === "twitter:title"
		// 	|| attrib['itemprop'] === "name") {
		// 		return_data['title'] = attrib['content']
		// 		has_meta_data = true;
		// }

		// if (   attrib['property'] === "og:image"
		// 	|| attrib['itemprop'] === "image"
		// 	|| attrib['property'] === "twitter:image:src") {
		// 		return_data['image'] = attrib['content']
		// 		has_meta_data = true;
		// 	}

	// });

	return true;
};

Scraper.prototype.scrape_html = function (html) {
	console.log("Scrape html");

	return_data = {}

	var $ = this.cheerio.load(html);	
	$('title').filter(function(){
		title_text = $(this)
		console.log(title_text.text());
		return_data['title'] = title_text.text();
	});

	body = $('body')

	paragraph = body.children('p').first();
	image = body.children('img').first();

	return_data['description'] = paragraph.text();
	return_data['image'] = image.attr('src');

	return return_data
};

module.exports = Scraper;