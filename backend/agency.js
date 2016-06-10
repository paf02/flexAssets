var mongoose = require('mongoose');

var agencySchema = {
	name: {
		type: String,
		required: true
	},
	acronym: {
		type: String
	},
	color: {
		type: String,
		required: true
	}
};

module.exports = new mongoose.Schema(agencySchema);
module.exports.agencySchema = agencySchema;	
