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

	function saveFile(argument) {
		var extension = '';
		var imgDat = argument.split(/^data:image\/(png|jpg|jpeg);base64,/);

		if (imgDat[1].indexOf('png') !== -1) extension = 'png'
		else if (imgDat[1].indexOf('jpg') !== -1 || imgDat[1].indexOf('jpeg') !== -1) extension = 'jpg'

		var generatePath = config.resumePath + shortid.generate() + '.' + extension;
		
		fs.writeFile(generatePath, imgDat[2], 'base64', function(err) {
		  if (err) 
		  	console.log(err);
		});

		return generatePath;
	}

	function deleteFile(filePath) {
		var too = config.publicAccess + filePath;

		fs.exists(too , function(exists) {
		  if(exists) {
		    fs.unlink(too);
		  }
		});
	}

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

	api.post('/user', wagner.invoke(function(User) {
		return function(req, res) {

			if (req.body.resume) {
				var urlFiles = req.headers.origin + saveFile(req.body.resume).split(config.publicAccess)[1];
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
        calendarPoint: req.body.calendarPoint,
        skill: req.body.skill
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

	api.put('/user', wagner.invoke(function(User) {
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

				// var updateObj = {
    //       name : req.body.name
    //     };


				if (req.body.resume) {
					var filePath = user.resume.split(req.headers.origin)[1];
					deleteFile(filePath);

					var urlFiles = req.headers.origin + saveFile(req.body.resume).split(config.publicAccess)[1];
					user.resume = urlFiles;
				}

				if (req.body.name)
					user.name = req.body.name;

				if (req.body.lastname)
					user.lastname = req.body.lastname;

				if (req.body.role)
					user.role.name = req.body.role.name;

				if (req.body.category)
					user.category.name = req.body.category.name;


				if(req.body.skill_remove) {
					if (user.skill && user.skill.length > 0) {
						for (var i = 0; i < user.skill.length; i++) {
							for (var ii = 0; ii < req.body.skill_remove.length; ii++) {
								if(user.skill[i]._doc.name == req.body.skill_remove[ii].name) {
									// console.log('match ' + user.skill[i]._doc.name);
									user.skill.splice(i, 1);
								}
							};
						};
					}
				}

				if(req.body.skill_new) {
					if (user.skill && user.skill.length > 0) {
						// req.body.skill_new.forEach(function(el, indx) {
						// 	user.skill.push(el);
						// });
						req.body.skill_new.forEach(function(el, indx) {
							user.skill.push(el);
						});
					} else {
						// for (var i = 0; i < user.skill.length; i++) {
						// 	for (var ii = 0; ii < req.body.skill_new.length; ii++) {
						// 		if(el_par._doc.name == el.name) {
						// 			console.log('match ' + el_par._doc.name);
						// 		}
						// 	};
						// };
						user.skill = req.body.skill_new;
					}
				}


				if (req.body.calendarPoint_remove) {
					if (user.calendarPoint && user.calendarPoint.length > 0) {
						for (var i = 0; i < user.calendarPoint.length; i++) {
							for (var ii = 0; ii < req.body.calendarPoint_remove.length; ii++) {
								if (user.calendarPoint[i]._doc.date.toString() == req.body.calendarPoint_remove[ii].date) {
									// in case of the date already exist, it just update the other values
									user.calendarPoint.splice(i, 1);
								}
							};
						};
					}
				}


				if (req.body.calendarPoint_new) {
					if (user.calendarPoint && user.calendarPoint.length > 0) {
						for (var i = 0; i < user.calendarPoint.length; i++) {
							for (var ii = 0; ii < req.body.calendarPoint_new.length; ii++) {
								if (user.calendarPoint[i]._doc.date.toString() == req.body.calendarPoint_new[ii].date) {
									// in case of the date already exist, it just update the other values
									user.calendarPoint[i]._doc.available = req.body.calendarPoint_new[ii].available;
									user.calendarPoint[i]._doc.book = req.body.calendarPoint_new[ii].book;
									req.body.calendarPoint_new.splice(ii, 1);
								}
							};
						};

						req.body.calendarPoint_new.forEach(function(ele, indx) {
							user.calendarPoint.push(ele);
						});
					} else {
						// direct insert
						req.body.calendarPoint_new.forEach(function(ele, indx) {
							user.calendarPoint.push(ele);
						});
					}
				}


				// user.update(updateObj, function(error, user) {
				user.save(function(error, user) {
					if (error) {
						return res.
							status(status.INTERNAL_SERVER_ERROR).
							json({ error: error.toString() });
					} 

					return res
						.status(status.OK)
						.json({ User: user });
				});
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
				
				var filePath = user.resume.split(req.headers.origin)[1];
				deleteFile(filePath);

				user.remove(function(error, user) {
					if (error) {
						return res.
							status(status.INTERNAL_SERVER_ERROR).
							json({ error: error.toString() });
					}

					return res
						.status(status.OK)
						.json({ User: user });
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

				res.json({ Role: role }); 
			}); 
		}; 
	}));

	api.post('/role', wagner.invoke(function(Role) {
		return function(req, res) {

			var newRole = new Role({
				name: req.body.name
			});

			newRole.save(function(error, role) {
				if (error) {
					return res.
						status(status.INTERNAL_SERVER_ERROR).
						json({ error: error.toString() });
				}

				return res
					.status(status.OK)
					.json({ Role: role });
			});
		}
	}));


	api.delete('/role', wagner.invoke(function(Role) {
		return function(req, res) {

			Role.findOne({ _id: req.body.id }, function(error, role) {
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

				role.remove(function(error, role) {
					if (error) {
						return res.
							status(status.INTERNAL_SERVER_ERROR).
							json({ error: error.toString() });
					}

					return res
						.status(status.OK)
						.json({ Role: user });
				});
			});			
		}
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

				res.json({ Category: category }); 
			}); 
		}; 
	}));

	api.post('/category', wagner.invoke(function(Category) {
		return function(req, res) {

			var newCategory = new Category({
				name: req.body.name
			});

			newCategory.save(function(error, category) {
				if (error) {
					return res.
						status(status.INTERNAL_SERVER_ERROR).
						json({ error: error.toString() });
				}

				return res
					.status(status.OK)
					.json({ Category: category });
			});
		}
	}));

	api.delete('/category', wagner.invoke(function(Category) {
		return function(req, res) {

			Category.findOne({ _id: req.body.id }, function(error, category) {
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

				category.remove(function(error, category) {
					if (error) {
						return res.
							status(status.INTERNAL_SERVER_ERROR).
							json({ error: error.toString() });
					}

					return res
						.status(status.OK)
						.json({ Category: user });
				});
			});			
		}
	}));


	api.get('/skill', wagner.invoke(function(Skill) {
		return function(req, res) {
			Skill.find(function(error, skill) {
				if (error) {
					return res.
						status(status.INTERNAL_SERVER_ERROR).
						json({ error: error.toString() });
				}

				if (!skill) {
					return res.
						status(status.NOT_FOUND).
						json({ error: 'Not found'});
				}

				res.json({ Skill: skill }); 
			}); 
		}; 
	}));

	api.post('/skill', wagner.invoke(function(Skill) {
		return function(req, res) {

			var newSkill = new Skill({
				name: req.body.name
			});

			newSkill.save(function(error, skill) {
				if (error) {
					return res.
						status(status.INTERNAL_SERVER_ERROR).
						json({ error: error.toString() });
				}

				return res
					.status(status.OK)
					.json({ Skill: skill });
			});
		}
	}));

	api.delete('/skill', wagner.invoke(function(Skill) {
		return function(req, res) {

			Skill.findOne({ _id: req.body.id }, function(error, skill) {
				if (error) {
					return res.
						status(status.INTERNAL_SERVER_ERROR).
						json({ error: error.toString() });
				}

				if (!skill) {
					return res.
						status(status.NOT_FOUND). 
						json({ error: 'Not found'});
				}

				skill.remove(function(error, skill) {
					if (error) {
						return res.
							status(status.INTERNAL_SERVER_ERROR).
							json({ error: error.toString() });
					}

					return res
						.status(status.OK)
						.json({ Skill: user });
				});
			});			
		}
	}));


	return api;
};












