var mongoose = require('mongoose');
var category = require('./category');
var role = require('./role');
var user = require('./user');
var skill = require('./skill');
var config = require('./config');
var _ = require('underscore');

module.exports = function(wagner) {
	mongoose.connect('mongodb://localhost:27017/' + config.dataBaseName);

	var Category = mongoose.model('Category', category, 'category');
	var Role = mongoose.model('Role', role, 'role');
	var User = mongoose.model('User', user, 'user');
	var Skill = mongoose.model('Skill', skill, 'skill');

	var models = {
		Category: Category,
		Role: Role,
		User: User,
		Skill: Skill
	};


	_.each(models, function(value, key) {
		wagner.factory(key, function() {
			return value;
		});
	});

	// wagner.factory('Category', function() { 
	// 	return Category;
	// });

	// wagner.factory('Role', function() {
	// 	return Role;
	// });

	// wagner.factory('User', function() {
	// 	return User;
	// });

	// wagner.factory('Skill', function() {
	// 	return Skill;
	// });

	return models;
};