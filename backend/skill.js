var mongoose = require('mongoose');

var skillSchema = {
	name: {
		type: String,
		required: true
	},
	level: {
		type: String,
		enum: ['basic', 'intermediate', 'advanced']
	}
};

module.exports = new mongoose.Schema(skillSchema);
module.exports.skillSchema = skillSchema;	
