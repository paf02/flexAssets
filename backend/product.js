var mongoose = require('mongoose');
var Category = require('./category');


var productSchema = {
	name: {
		type: String,
		required: true
	},
	pictures: [{
		type: String,
		match: /^http:\/\//i
	}],
	rate: {
		type: Number,
		min: 1,
		max: 5
	},
	tags: [{
		type: String
	}],
	price: {
		amount: {
			type: Number,
			required: true
		},
		currency: {
			type: String,
			enum: ['USD', 'EUR', 'GBP'],
			required: true
		},
		discount: {
			type: Number
		}
	},
	category: Category.categorySchema
};

module.exports = new mongoose.Schema(productSchema);
module.exports.productSchema = productSchema;