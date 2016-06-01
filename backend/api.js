var bodyparser = require('body-parser');
var express = require('express');
var status = require('http-status');
var shortid = require('shortid');
var fs = require('fs');
var config = require('./config');


module.exports = function(wagner) {
	var api = express.Router();

	api.use(bodyparser.json({limit: config.maxFileSize}));
	api.use(bodyparser.urlencoded({limit: config.maxFileSize, extended: true}));


	api.get('/user', wagner.invoke(function(User) {
		return function(req, res) {
			User.find(function(error, user) {
				if (error) {
					return res.
						status(status.INTERNAL_SERVER_ERROR).
						json({ error: error.toString() });
				}

				if (!user) {
					return res.
						status(status.NOT_FOUND).
						json({ error: 'Not found'});
				}

				res.json({ user: user }); 
			}); 
		}; 
	}));


	function saveFile(argument) {
		var extension = '';
		var imgDat = argument.split(/^data:image\/(png|jpg|jpeg);base64,/);

		if (imgDat[1].indexOf('png') !== -1) extension = 'png'
		else if (imgDat[1].indexOf('jpg') !== -1 || imgDat[1].indexOf('jpeg') !== -1) extension = 'jpg'

		var generatePath = config.resumePath + shortid.generate() + '.' + extension;
		
		fs.writeFile(generatePath, imgDat[2], 'base64', function(err) {
		  console.log(err);
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


	api.post('/user', wagner.invoke(function(User) {
		return function(req, res) {

			if (req.body.resume) {
				var urlFiles = req.body.resume.map(function(obj){ 
				  return req.headers.origin + saveFile(obj).split(config.publicAccess)[1];
				});
			}

			var newUser = new User({
				name: req.body.name,
        lastname: req.body.lastname,
        resume: urlFiles,
        role: {
        	name: req.body.role.name
        },
        category: {
        	name: req.body.category.name,
        },
        calendarPoint: req.body.calendarPoint
			});

			newUser.save(function(error, user) {
				if (error) {
					return res.
						status(status.INTERNAL_SERVER_ERROR).
						json({ error: error.toString() });
				}

				return res
					.status(status.OK)
					.json({ User: user });
			});
		}
	}));


	api.delete('/user', wagner.invoke(function(User) {
		return function(req, res) {

			User.findOne({ _id: req.body.id }, function(error, user) {
				if (error) {
					return res.
						status(status.INTERNAL_SERVER_ERROR).
						json({ error: error.toString() });
				}

				if (!user) {
					return res.
						status(status.NOT_FOUND). 
						json({ error: 'Not found'});
				}
				
				user.resume.forEach(function(ele, indx) {
					var algo = ele.split(req.headers.origin)[1];
					deleteFile(algo);
				});

				user.remove(function(error, user) {
					if (error) {
						return res.
							status(status.INTERNAL_SERVER_ERROR).
							json({ error: error.toString() });
					}

					return res
						.status(status.OK)
						.json({ User: product });
				});
			});			
		}
	}));


	api.get('/role', wagner.invoke(function(Role) {
		return function(req, res) {
			Role.find(function(error, role) {
				if (error) {
					return res.
						status(status.INTERNAL_SERVER_ERROR).
						json({ error: error.toString() });
				}

				if (!role) {
					return res.
						status(status.NOT_FOUND).
						json({ error: 'Not found'});
				}

				res.json({ role: role }); 
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


	return api;
};












