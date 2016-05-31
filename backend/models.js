var mongoose = require('mongoose');
var category = require('./category');
var product = require('./product');
var config = require('./config');

module.exports = function(wagner) {
	mongoose.connect('mongodb://localhost:27017/' + config.dataBaseName);

	// var Category = mongoose.model('Category', require('./category'), 'categories');

	var Category = mongoose.model('Category', category);
	var Product = mongoose.model('Product', product);

	var models = {
		Category: Category,
		Product: Product
	};

	wagner.factory('Category', function() {
		return Category;
	});

	wagner.factory('Product', function() {
		return Product;
	});

	return models;
};