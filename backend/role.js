var mongoose = require('mongoose');

var roleSchema = {
	name: {
		type: String,
		required: true
	}
};

module.exports = new mongoose.Schema(roleSchema);
module.exports.roleSchema = roleSchema;	
