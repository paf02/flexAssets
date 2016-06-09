var mongoose = require('mongoose');
var Category = require('./category');

var roleSchema = {
	name: {
		type: String,
		required: true
	},
	category: Category.categorySchema,
};

module.exports = new mongoose.Schema(roleSchema);
module.exports.roleSchema = roleSchema;	
