var mongoose = require('mongoose');

var skillSchema = {
	name: {
		type: String,
		required: true
	}
};

module.exports = new mongoose.Schema(skillSchema);
module.exports.skillSchema = skillSchema;	
