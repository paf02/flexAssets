var mongoose = require('mongoose');

var countrySchema = {
	name: {
		type: String,
		required: true
	},
	acronym: {
		type: String
	}
};

module.exports = new mongoose.Schema(countrySchema);
module.exports.countrySchema = countrySchema;	
