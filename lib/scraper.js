function Scraper () {
	this.fs 	 = require('fs');
	this.cheerio = require('cheerio');
}

Scraper.prototype.scrape_metadata = function (html) {
	var return_data = {};
	var has_meta_data = false;
	var $ = this.cheerio.load(html);

	meta_tags = $('head').children('meta');

	description_list = ["og:description","twitter:description", "description", "description"];
	title_list = ["og:title","twitter:title", "title", "subject"];
	image_list = ["og:image","twitter:image:src", "image"];

	meta_tag_dict = {};

	//take the data from the cheerio function, and organize it into a nicer dictionary
	//the key is the meta-tag property/itemprop/name attribute, the value is the content.
	for (meta_tag in meta_tags) {
		tag_attrib = meta_tags[meta_tag]['attribs'];
		if(tag_attrib) {
			if (tag_attrib['property']) {
				meta_tag_dict[tag_attrib['property']] = tag_attrib['content']
			} 

			else if (tag_attrib['itemprop']) {
				meta_tag_dict[tag_attrib['itemprop']] = tag_attrib['content']
			} 

			else if (tag_attrib['name']) {
				meta_tag_dict[tag_attrib['name']] = tag_attrib['content']
			}
		}
	}

	//find the description of the page
	for (description in description_list) {
		if(meta_tag_dict[description_list[description]]) {
			return_data["description"] = meta_tag_dict[description_list[description]];
			break;
		}
	}

	//find the title of the page
	for (title in title_list) {
		if(meta_tag_dict[title_list[title]]) {
			return_data["title"] = meta_tag_dict[title_list[title]];
			break;
		}
	}

	//find the image, if one exists.
	for (image in image_list) {
		if(meta_tag_dict[image_list[image]]) {
			return_data["image"] = meta_tag_dict[image_list[image]];
			break;
		}
	}

	if ( return_data !== {} )
		return return_data
	else
		return false;
};

Scraper.prototype.scrape_html = function (html) {

	return_data = {}

	//get the webpage body
	var $ = this.cheerio.load(html);	

	//get the title from the <title> element
	$('title').filter(function(){
		title_text = $(this)
		return_data['title'] = title_text.text();
	});

	body = $('body')

	//Retrieves the first <p> and <img> element in the HTML body.
	paragraph = body.children('p').first();
	image = body.children('img').first();

	return_data['description'] = paragraph.text();
	return_data['image'] = image.attr('src');

	return return_data
};

module.exports = Scraper;