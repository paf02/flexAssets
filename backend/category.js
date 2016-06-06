var mongoose = require('mongoose');

var categorySchema = {
	name: {
		type: String,
		required: true
	}
};

module.exports = new mongoose.Schema(categorySchema);
module.exports.categorySchema = categorySchema;	
