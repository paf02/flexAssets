var bodyparser = require('body-parser');
var express = require('express');
var status = require('http-status');
var shortid = require('shortid');
var fs = require('fs');
var config = require('./config');


module.exports = function(wagner) {
	var api = express.Router();

	// api.use(bodyparser.json());
	// api.use(bodyparser.urlencoded({ extended: true }));

	api.use(bodyparser.json({limit: config.maxFileSize}));
	api.use(bodyparser.urlencoded({limit: config.maxFileSize, extended: true}));
 

	api.get('/category/:id', wagner.invoke(function(Category) {
		return function(req, res) {
			Category.findOne({ _id: req.params.id }, function(error, category) {
				if (error) {
					return res.
						status(status.INTERNAL_SERVER_ERROR).
						json({ error: error.toString() });
				}

				if (!category) {
					return res.
						status(status.NOT_FOUND).
						json({ error: 'Not found'});
				}

				res.json({ category: category }); 
			}); 
		}; 
	}));

	api.get('/category', wagner.invoke(function(Category) {
		return function(req, res) {
			Category.find(function(error, category) {
				if (error) {
					return res.
						status(status.INTERNAL_SERVER_ERROR).
						json({ error: error.toString() });
				}

				if (!category) {
					return res.
						status(status.NOT_FOUND).
						json({ error: 'Not found'});
				}

				res.json({ category: category }); 
			}); 
		}; 
	}));


	api.get('/product/:id', wagner.invoke(function(Product) {
		return function(req, res) {
			Product.findOne({ _id: req.params.id }, function(error, product) {
				if (error) {
					return res.
						status(status.INTERNAL_SERVER_ERROR).
						json({ error: error.toString() });
				}

				if (!product) {
					return res.
						status(status.NOT_FOUND).
						json({ error: 'Not found'});
				}

				res.json({ product: product }); 
			}); 
		}; 
	}));

	api.get('/product', wagner.invoke(function(Product) {
		return function(req, res) {
			Product.find(function(error, product) {
				if (error) {
					return res.
						status(status.INTERNAL_SERVER_ERROR).
						json({ error: error.toString() });
				}

				if (!product) {
					return res.
						status(status.NOT_FOUND).
						json({ error: 'Not found'});
				}

				res.json({ product: product }); 
			}); 
		}; 
	}));






	// var categories = [
	// 	{ _id: 'Electronics' },
	// 	{ _id: 'Phones', parent: 'Electronics' },
	// 	{ _id: 'laptops', parent: 'Electronics' },
	// 	{ _id: 'Bacon' }
	// ];

	// var products = [
	// 	{
	// 		name: 'LG G4',
	// 		category: { _id: 'Phones', ancestors: ['Electronics', 'Phones'] },
	// 		price: {
	// 			amount: 300,
	// 			currency: 'USD'
	// 		}
	// 	},
	// 	{
	// 		name: 'Asus Zenbook Prime',
	// 		category: { _id: 'Laptops', ancestors: ['Electronics', 'Laptops'] },
	// 		price: {
	// 			amount: 2000,
	// 			currency: 'USD'
	// 		}
	// 	},
	// 	{
	// 		name: 'Flying Pigs Farm Pasture Raised Pork Bacon',
	// 		category: { _id: 'Bacon', ancestors: ['Bacon'] },
	// 		price: {
	// 			amount: 20,
	// 			currency: 'USD'
	// 		}
	// 	}
	// ];

	function saveImage(argument) {
		var extension = '';
		var imgDat = argument.split(/^data:image\/(png|jpg|jpeg);base64,/);

		if (imgDat[1].indexOf('png') !== -1) extension = 'png'
		else if (imgDat[1].indexOf('jpg') !== -1 || imgDat[1].indexOf('jpeg') !== -1) extension = 'jpg'

		// var base64Data = argument.replace(/^data:image\/(png|jpg|jpeg);base64,/, '');
		// var base64Data = ;
		var generatePath = config.imagesPath + shortid.generate() + '.' + extension;
		
		fs.writeFile(generatePath, imgDat[2], 'base64', function(err) {
		  // console.log(err);
		});

		return generatePath;
	}

	function deleteFile(algo) {
		var too = config.publicAccess + algo;

		fs.exists(too , function(exists) {
		  if(exists) {
		    fs.unlink(too);
		  }
		});
	}

	api.post('/product', wagner.invoke(function(Product) {
		return function(req, res) {
			if (req.body.pictures) {
				var namePictures = req.body.pictures.map(function(obj){ 
				  return req.headers.origin + saveImage(obj).split(config.publicAccess)[1];
				});
			}

			var newProduct = new Product({
				name: req.body.name,
				pictures: namePictures,
				rate: req.body.rate,
				tags: req.body.tags.split(','), 
				price: {
					discount: req.body.price.discount,
					amount: req.body.price.amount,
					currency: req.body.price.currency
				},
				category: { 
					_id: req.body.category._id,
					parent: req.body.category.parent,
					ancestors: req.body.category.ancestors 
				}
				// category: {
				// 	_id: 'IOS', 
				// 	parent: 'Phones', 
				// 	ancestors: ['Electronics']
				// }
			});

			newProduct.save(function(error, product) {
				if (error) {
					return res.
						status(status.INTERNAL_SERVER_ERROR).
						json({ error: error.toString() });
				}

				return res
					.status(status.OK)
					.json({ Product: product });
			})
		}
	}));

	api.put('/product', wagner.invoke(function(Product) {
		return function(req, res) {

			Product.findOne({ _id: req.body.id }, function(error, product) {
				if (error) {
					return res.
						status(status.INTERNAL_SERVER_ERROR).
						json({ error: error.toString() });
				}

				if (!product) {
					return res.
						status(status.NOT_FOUND). 
						json({ error: 'Not found'});
				}

				if (req.body.name)
					product.name = req.body.name;

				if (req.body.rate)
					product.rate = req.body.rate;

				if (req.body.tags)
					product.tags = req.body.tags;

				// if (req.body.pictures)
				// 	product.pictures = req.body.pictures;

				if (req.body.price) {
					if (req.body.price.amount)
						product.price.amount = req.body.price.amount;

					if (req.body.price.currency)
						product.price.currency = req.body.price.currency;

					if (req.body.price.discount)
						product.price.discount = req.body.price.discount;
				}

				if (req.body.category) {
					if (req.body.category._id)
						product.category._id = req.body.category._id;

					if (req.body.category.ancestors)
						product.category.ancestors = req.body.category.ancestors;					
				}



				product.save(function(error, product) {
					if (error) {
						return res.
							status(status.INTERNAL_SERVER_ERROR).
							json({ error: error.toString() });
					} 

					return res
						.status(status.OK)
						.json({ Product: product });
				});
			});			
		}
	}));


	api.delete('/product', wagner.invoke(function(Product) {
		return function(req, res) {

			Product.findOne({ _id: req.body.id }, function(error, product) {
				if (error) {
					return res.
						status(status.INTERNAL_SERVER_ERROR).
						json({ error: error.toString() });
				}

				if (!product) {
					return res.
						status(status.NOT_FOUND). 
						json({ error: 'Not found'});
				}
				
				product.pictures.forEach(function(ele, indx) {
					var algo = ele.split(req.headers.origin)[1];
					deleteFile(algo);
				});

				product.remove(function(error, product) {
					if (error) {
						return res.
							status(status.INTERNAL_SERVER_ERROR).
							json({ error: error.toString() });
					}


					return res
						.status(status.OK)
						.json({ Product: product });
				});
			});			
		}
	}));

	

	return api;
};












