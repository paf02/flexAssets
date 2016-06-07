var mongoose = require('mongoose');
var Category = require('./category');
var Role = require('./role');
var Country = require('./country');
var Skill = require('./skill');

var userSchema = {
	name: {
		type: String,
		required: true
	},
	lastname: {
		type: String,
		required: true
	},
	resume: {
		type: String,
		match: /^http:\/\//i
	},
	country: Country.countrySchema,
	role: Role.roleSchema,
	category: Category.categorySchema,
	skill: [Skill.skillSchema],
	calendarPoint: [{
		date: {
			type: Date,
			required: true
		},
		available: {
			type: Boolean
		},
		book: {
			type: Number,
			max: 1,
			min: 0
		}
	}]
};

module.exports = new mongoose.Schema(userSchema);
module.exports.userSchema = userSchema;