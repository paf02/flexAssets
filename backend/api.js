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

	api.get('/user/filterByID/:id', wagner.invoke(function(User) {
		return function(req, res) {

			User.findOne({ _id: req.params.id }, function(error, user) {
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

				res.json({ User: user }); 
			});			
		}
	}));

	api.get('/user', wagner.invoke(function(User) {
		return function(req, res) {
			User.find({ 'belong.name': 'Flex' }, function(error, user) {
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

				res.json({ User: user }); 
			}); 
		}; 
	}));

	api.get('/user/all', wagner.invoke(function(User) {
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

				res.json({ User: user }); 
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
        email: req.body.email,
        wfh: req.body.wfh,
        tel: req.body.tel,
        visa: req.body.visa,
        passport: req.body.passport,
        dates: req.body.dates,
        belong: req.body.belong,
        country: req.body.country,
        role: req.body.role,
        skill: req.body.skill,
        calendarPoint: req.body.calendarPoint,
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

				if (req.body.resume) {
					var filePath = user.resume.split(req.headers.origin)[1];
					deleteFile(filePath);

					var urlFiles = req.headers.origin + saveFile(req.body.resume).split(config.publicAccess)[1];
					user.resume = urlFiles;
				}

				if (req.body.country)
					user.country = req.body.country;

				if (req.body.name)
					user.name = req.body.name;

				if (req.body.lastname)
					user.lastname = req.body.lastname;

				if (req.body.role)
					user.role = req.body.role;

				if (req.body.email)
					email = req.body.email;

        if (req.body.tel)
        	tel = req.body.tel;

        if (req.body.visa)
        	visa = req.body.visa;

        if (req.body.passport)
        	passport = req.body.passport;

        if (req.body.dates.dateCompanyIn)
        	dates = req.body.dates.dateCompanyIn

        if (req.body.dates.dateFlexIn)
        	dates = req.body.dates.dateFlexIn

        if (req.body.dates.dateFlexOut)
        	dates = req.body.dates.dateFlexOut

        if (req.body.belong)
        	belong = req.body.belong;

        if (req.body.wfh)
        	wfh = req.body.wfh;

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

	api.delete('/user/all', wagner.invoke(function(User) {
		return function(req, res) {

			User.remove(function(error, user) {
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


	api.get('/role/:categoryName', wagner.invoke(function(Role) {
		return function(req, res) {
			Role.find({ 'category.name': req.params.categoryName }, function(error, role) {
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
				name: req.body.name,
				category: req.body.category
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

	api.delete('/role/all', wagner.invoke(function(Role) {
		return function(req, res) {

			Role.remove(function(error, role) {
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

	api.delete('/category/all', wagner.invoke(function(Category) {
		return function(req, res) {

			Category.remove(function(error, category) {
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

	api.delete('/skill/all', wagner.invoke(function(Skill) {
		return function(req, res) {

			Skill.remove(function(error, skill) {
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


	api.get('/country', wagner.invoke(function(Country) {
		return function(req, res) {
			Country.find(function(error, country) {
				if (error) {
					return res.
						status(status.INTERNAL_SERVER_ERROR).
						json({ error: error.toString() });
				}

				if (!country) {
					return res.
						status(status.NOT_FOUND).
						json({ error: 'Not found'}); 
				}

				res.json({ Country: country }); 
			}); 
		}; 
	}));

	api.post('/country', wagner.invoke(function(Country) {
		return function(req, res) {

			var newCountry = new Country({
				name: req.body.name,
				acronym: req.body.acronym
			});

			newCountry.save(function(error, country) {
				if (error) {
					return res.
						status(status.INTERNAL_SERVER_ERROR).
						json({ error: error.toString() });
				}

				return res
					.status(status.OK)
					.json({ Country: country });
			});
		}
	}));

	api.delete('/country', wagner.invoke(function(Country) {
		return function(req, res) {

			Country.findOne({ _id: req.body.id }, function(error, country) {
				if (error) {
					return res.
						status(status.INTERNAL_SERVER_ERROR).
						json({ error: error.toString() });
				}

				if (!country) {
					return res.
						status(status.NOT_FOUND). 
						json({ error: 'Not found'});
				}

				country.remove(function(error, country) {
					if (error) {
						return res.
							status(status.INTERNAL_SERVER_ERROR).
							json({ error: error.toString() });
					}

					return res
						.status(status.OK)
						.json({ Country: user });
				});
			});			
		}
	}));

	api.delete('/country/all', wagner.invoke(function(Country) {
		return function(req, res) {

			Country.remove(function(error, country) {
				if (error) {
					return res.
						status(status.INTERNAL_SERVER_ERROR).
						json({ error: error.toString() });
				}

				return res
					.status(status.OK)
					.json({ Country: country });
			});		
		}
	}));


	api.get('/admin/all', wagner.invoke(function(Admin) {
		return function(req, res) {
			Admin.find(function(error, admin) {
				if (error) {
					return res.
						status(status.INTERNAL_SERVER_ERROR).
						json({ error: error.toString() });
				}

				if (!admin) {
					return res.
						status(status.NOT_FOUND).
						json({ error: 'Not found'}); 
				}

				res.json({ Admin: admin }); 
			}); 
		}; 
	}));

	api.post('/adminFind', wagner.invoke(function(Admin) {
		return function(req, res) {
			Admin.find({ 
				username: req.body.username,
				password: req.body.password,
				}, function(error, admin) {
				if (error) {
					return res.
						status(status.INTERNAL_SERVER_ERROR).
						json({ error: error.toString() });
				}

				if (!admin) {
					return res.
						status(status.NOT_FOUND).
						json({ error: 'Not found'}); 
				}

				res.json({ Admin: admin }); 
			}); 
		}; 
	}));

	api.post('/admin', wagner.invoke(function(Admin) {
		return function(req, res) {

			var newAdmin = new Admin({
				name: req.body.name,
				lastname: req.body.lastname,
				username: req.body.username,
				password: req.body.password
			});

			newAdmin.save(function(error, admin) {
				if (error) {
					return res.
						status(status.INTERNAL_SERVER_ERROR).
						json({ error: error.toString() });
				}

				return res
					.status(status.OK)
					.json({ Admin: admin });
			});
		}
	}));

	api.delete('/admin', wagner.invoke(function(Admin) {
		return function(req, res) {

			Admin.findOne({ _id: req.body.id }, function(error, admin) {
				if (error) {
					return res.
						status(status.INTERNAL_SERVER_ERROR).
						json({ error: error.toString() });
				}

				if (!admin) {
					return res.
						status(status.NOT_FOUND). 
						json({ error: 'Not found'});
				}

				admin.remove(function(error, admin) {
					if (error) {
						return res.
							status(status.INTERNAL_SERVER_ERROR).
							json({ error: error.toString() });
					}

					return res
						.status(status.OK)
						.json({ Admin: admin });
				});
			});			
		}
	}));

	api.delete('/admin/all', wagner.invoke(function(Admin) {
		return function(req, res) {

			Admin.remove(function(error, admin) {
				if (error) {
					return res.
						status(status.INTERNAL_SERVER_ERROR).
						json({ error: error.toString() });
				}

				return res
					.status(status.OK)
					.json({ Admin: admin });
			});		
		}
	}));



	api.get('/agency', wagner.invoke(function(Agency) {
		return function(req, res) {
			Agency.find(function(error, agency) {
				if (error) {
					return res.
						status(status.INTERNAL_SERVER_ERROR).
						json({ error: error.toString() });
				}

				if (!agency) {
					return res.
						status(status.NOT_FOUND).
						json({ error: 'Not found'}); 
				}

				res.json({ Agency: agency }); 
			}); 
		}; 
	}));

	api.post('/agency', wagner.invoke(function(Agency) {
		return function(req, res) {

			var newAgency = new Agency({
				name: req.body.name,
				acronym: req.body.acronym,
				color: req.body.color
			});

			newAgency.save(function(error, agency) {
				if (error) {
					return res.
						status(status.INTERNAL_SERVER_ERROR).
						json({ error: error.toString() });
				}

				return res
					.status(status.OK)
					.json({ Agency: agency });
			});
		}
	}));

	api.delete('/agency', wagner.invoke(function(Agency) {
		return function(req, res) {

			Agency.findOne({ _id: req.body.id }, function(error, agency) {
				if (error) {
					return res.
						status(status.INTERNAL_SERVER_ERROR).
						json({ error: error.toString() });
				}

				if (!agency) {
					return res.
						status(status.NOT_FOUND). 
						json({ error: 'Not found'});
				}

				agency.remove(function(error, agency) {
					if (error) {
						return res.
							status(status.INTERNAL_SERVER_ERROR).
							json({ error: error.toString() });
					}

					return res
						.status(status.OK)
						.json({ Agency: user });
				});
			});			
		}
	}));

	api.delete('/agency/all', wagner.invoke(function(Agency) {
		return function(req, res) {

			Agency.remove(function(error, agency) {
				if (error) {
					return res.
						status(status.INTERNAL_SERVER_ERROR).
						json({ error: error.toString() });
				}

				return res
					.status(status.OK)
					.json({ Agency: agency });
			});		
		}
	}));

	return api;
};












