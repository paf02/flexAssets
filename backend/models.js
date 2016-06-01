var mongoose = require('mongoose');
var category = require('./category');
var role = require('./role');
var user = require('./user');
var config = require('./config');

module.exports = function(wagner) {
	mongoose.connect('mongodb://localhost:27017/' + config.dataBaseName);

	var Category = mongoose.model('Category', category, 'category');
	var Role = mongoose.model('Role', role, 'role');
	var User = mongoose.model('User', user, 'user');

	var models = {
		Category: Category,
		Role: Role,
		User: User
	};

	wagner.factory('Category', function() { 
		return Category;
	});

	wagner.factory('Role', function() {
		return Role;
	});

	wagner.factory('User', function() {
		return User;
	});

	return models;
};