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

	for (meta_tag in meta_tags) {
		tag_attrib = meta_tags[meta_tag]['attribs'];
		if(tag_attrib) {
			if (tag_attrib['property']) {
				meta_tag_dict[tag_attrib['property']] = tag_attrib['content']
			} 

			if (tag_attrib['itemprop']) {
				meta_tag_dict[tag_attrib['itemprop']] = tag_attrib['content']
			} 

			if (tag_attrib['name']) {
				meta_tag_dict[tag_attrib['name']] = tag_attrib['content']
			}
		}
	}

	for (description in description_list) {
		if(meta_tag_dict[description_list[description]]) {
			return_data["description"] = meta_tag_dict[description_list[description]];
			break;
		}
	}

	for (title in title_list) {
		if(meta_tag_dict[title_list[title]]) {
			return_data["title"] = meta_tag_dict[title_list[title]];
			break;
		}
	}

	for (image in image_list) {
		if(meta_tag_dict[image_list[image]]) {
			return_data["image"] = meta_tag_dict[image_list[image]];
			break;
		}
	}

	if (return_data.length > 0)
		return return_data
	else
		return false;
};

Scraper.prototype.scrape_html = function (html) {

	return_data = {}

	var $ = this.cheerio.load(html);	
	$('title').filter(function(){
		title_text = $(this)
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