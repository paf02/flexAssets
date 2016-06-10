var mongoose = require('mongoose');
var Role = require('./role');
var Country = require('./country');
var Skill = require('./skill');
var Agency = require('./agency');

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
	email: {
		type: String
	},
	wfh: [{
		type: String,
		enum: ['m', 't', 'w', 'r', 'f']
	}],
	tel: {
		type: String
	},
	visa: {
		type: Boolean
	},
	passport: {
		type: Boolean
	},
	dates: {
		dateCompanyIn: {
			type: String
		},
		dateFlexIn: {
			type: String
		},
		dateFlexOut: {
			type: String
		}
	},
	belong: Agency.agencySchema,
	country: Country.countrySchema,
	role: Role.roleSchema,
	skill: [Skill.skillSchema],
	calendarPoint: [{
		date: {
			type: Date,
			required: true
		},
		timeOff: {
			type: String,
			enum: ['', 'vacation', 'holiday', 'incapacitation']
		},
		book: [{
			time: {
				type: Number,
				max: 1,
				min: 0
			},
			agency: Agency.agencySchema
		}]
	}]
};

module.exports = new mongoose.Schema(userSchema);
module.exports.userSchema = userSchema;