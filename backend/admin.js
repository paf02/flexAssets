var mongoose = require('mongoose');

var adminSchema = {
	name: {
		type: String,
		required: true
	},
	lastname: {
		type: String,
		required: true
	},
	username: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	}
};

module.exports = new mongoose.Schema(adminSchema);
module.exports.adminSchema = adminSchema;