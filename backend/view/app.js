
$(function () {
    $('.populateBD').on('click', function (e) {
        e.preventDefault();
        deleteAllDocuments('country');
        deleteAllDocuments('skill');
        deleteAllDocuments('category');
        deleteAllDocuments('role');
        deleteAllDocuments('admin');
        deleteAllDocuments('agency');

        setTimeout(function () {
            preloadBD().country.forEach(function (element, index) {
                bdCall('country', element);
            });

            preloadBD().skill.forEach(function (element, index) {
                bdCall('skill', element);
            });

            preloadBD().category.forEach(function (element, index) {
                bdCall('category', element);
            });

            preloadBD().role.forEach(function (element, index) {
                bdCall('role', element);
            });

            preloadBD().admin.forEach(function (element, index) {
                bdCall('admin', element);
            });

            preloadBD().agency.forEach(function (element, index) {
                bdCall('agency', element);
            });
        }, 5000);

    });

    function deleteAllDocuments(endPointName) {
        $.ajax({
            url: 'http://localhost:3000/api/v1/' + endPointName + '/all',
            type: 'DELETE',
            dataType: 'json',
            cache: false,
            // processData: false,
            success: function (data, textStatus, jqXHR) {
                console.log("data = " + JSON.stringify(data));
                console.log("textStatus = " + textStatus);
                console.log("jqXHR = " + jqXHR);
            }, error: function (jqXHR, textStatus, errorThrown) {
                console.log("errorThrown = ");
                console.log(errorThrown);
                console.log(textStatus);
                console.log(jqXHR);
            }
        });
    }


    function bdCall(endPointName, ele) {
        $.ajax({
            url: 'http://localhost:3000/api/v1/' + endPointName,
            type: 'POST',
            data: ele,
            dataType: 'json',
            cache: false,
            // processData: false,
            success: function (data, textStatus, jqXHR) {
                console.log("data = " + JSON.stringify(data));
                console.log("textStatus = " + textStatus);
                console.log("jqXHR = " + jqXHR);
            }, error: function (jqXHR, textStatus, errorThrown) {
                console.log("errorThrown = ");
                console.log(errorThrown);
                console.log(textStatus);
                console.log(jqXHR);
            }
        });
    }


    $('.create').on('click', function (e) {
        e.preventDefault();

        $.ajax({
            url: 'http://localhost:3000/api/v1/user',
            type: 'POST',
            data: formData(),
            dataType: 'json',
            cache: false,
            // processData: false,
            success: function (data, textStatus, jqXHR) {
                console.log("data = " + JSON.stringify(data));
                console.log("textStatus = " + textStatus);
                console.log("jqXHR = " + jqXHR);
            }, error: function (jqXHR, textStatus, errorThrown) {
                console.log("errorThrown = ");
                console.log(errorThrown);
                console.log(textStatus);
                console.log(jqXHR);
            }
        });
    });

    $('.update').on('click', function (e) {
        e.preventDefault();
        $.ajax({
            url: 'http://localhost:3000/api/v1/user',
            type: 'PUT',
            data: filesData,
            dataType: 'json',
            //processData: false,
            cache: false,
            success: function (data, textStatus, jqXHR) {
                console.log("data = " + JSON.stringify(data));
                console.log("textStatus = " + textStatus);
                console.log("jqXHR = " + jqXHR);
            }, error: function (jqXHR, textStatus, errorThrown) {
                console.log("errorThrown = ");
                console.log(errorThrown);
                console.log(textStatus);
                console.log(jqXHR);
            }
        });
    });

    $('#uploadForm').submit(function () {
         e.preventDefault();
        $("#status").empty().text("File is uploading...");
        $.ajax({
        url:'http://localhost:3000/api/v1//user/addCV',
        type:'post',
        data:$('#uploadForm').serialize(),
        success:function(){
            alert("worked");
        }
    });
    });

    $('.remove').on('click', function (e) {
        e.preventDefault();

        $.ajax({
            url: 'http://localhost:3000/api/v1/user',
            type: 'DELETE',
            data: formData(),
            dataType: 'json',
            cache: false,
            // processData: false,
            success: function (data, textStatus, jqXHR) {
                console.log("data = " + JSON.stringify(data));
                console.log("textStatus = " + textStatus);
                console.log("jqXHR = " + jqXHR);
            }, error: function (jqXHR, textStatus, errorThrown) {
                console.log("errorThrown = ");
                console.log(errorThrown);
                console.log(textStatus);
                console.log(jqXHR);
            }
        });
    });

    $('.upload-input').on('change', function () {
        var $_th = $(this);
        if (this.files && this.files[0]) {
            var FR = new FileReader();
            FR.onload = function (e) {
                filesData = e.target.result;
            };
            FR.readAsDataURL(this.files[0]);
        }
    });
});

function preloadBD() {
    var collection = {};

    collection.skill = [{
        name: 'html'
    }, {
            name: 'js'
        }, {
            name: 'angular.js'
        }, {
            name: 'photoshop'
        }, {
            name: 'backbone.js'
        }, {
            name: 'css'
        }, {
            name: 'html5'
        }, {
            name: 'css3'
        }, {
            name: 'node.js'
        }, {
            name: 'mongo.js'
        }];

    collection.category = [{
        name: 'design'
    }, {
            name: 'motion design'
        }, {
            name: 'development'
        }, {
            name: 'qa analyst'
        }];

    collection.role = [{
        name: 'Front End Engineer',
        category: collection.category[2]
    }, {
            name: 'Back End Engineer',
            category: collection.category[2]
        }, {
            name: 'Software Engineer Java',
            category: collection.category[2]
        }, {
            name: 'Sr. Software Engineer .Net',
            category: collection.category[2]
        }, {
            name: 'Sr. front End Engineer',
            category: collection.category[2]
        }, {
            name: 'Creative Engineer OLA',
            category: collection.category[0]
        }, {
            name: 'Creative Engineer Email',
            category: collection.category[0]
        }, {
            name: 'Flash Motion Designer',
            category: collection.category[1]
        }, {
            name: 'Functional QA Analyst',
            category: collection.category[3]
        }, {
            name: 'Sr. Functional QA Analyst',
            category: collection.category[3]
        }];

    collection.country = [{
        name: 'Costa Rica',
        acronym: 'CR'
    }, {
            name: 'Colombia',
            acronym: 'CO'
        }, {
            name: 'Mauritius',
            acronym: 'MU'
        }];

    collection.admin = [{
        name: 'admin',
        lastname: 'admin',
        password: '123',
        username: '123'
    }];

    collection.agency = [{
        name: 'Flex',
        acronym: 'Fl',
        color: 'red'
    }, {
            name: 'Digitas',
            acronym: 'Di',
            color: 'blue'
        }, {
            name: 'Moxie',
            acronym: 'Mo',
            color: 'green'
        }];

    return collection;
}


var filesData = null;

function tome() {
    return {
        id: $('input:text[name=id]').val(),
        name: $('input:text[name=name]').val(),
        lastname: $('input:text[name=lastname]').val(),
        resume: filesData,
    }
}
function formData() {
    return {
        id: $('input:text[name=id]').val(),
        name: $('input:text[name=name]').val(),
        lastname: $('input:text[name=lastname]').val(),
        resume: filesData,
        email: $('input:text[name=name]').val() + '.' + $('input:text[name=lastname]').val() + '@prodigious.com',
        wfh: ['m', 'w'],
        tel: '8567-9898',
        visa: false,
        passport: true,
        dates: {
            dateCompanyIn: new Date('01/01/16'),
            dateFlexIn: new Date('01/01/16'),
            dateFlexOut: '',
        },
        belong: preloadBD().agency[0],
        country: preloadBD().country[0],
        role: preloadBD().role[1],
        skill: [
            preloadBD().skill[1],
            preloadBD().skill[2],
            preloadBD().skill[4],
            preloadBD().skill[3],
            preloadBD().skill[5],
            preloadBD().skill[8]
        ],
        calendarPoint: [{
            date: new Date('06/15/16'),
            timeOff: 'vacation',
        }, {
                date: new Date('06/16/16'),
                timeOff: '',
                book: {
                    time: 1,
                    agency: preloadBD().agency[1]
                }
            }, {
                date: new Date('06/17/16'),
                timeOff: '',
                book: {
                    time: 1,
                    agency: preloadBD().agency[1]
                }
            }, {
                date: new Date('06/20/16'),
                timeOff: '',
                book: {
                    time: 1,
                    agency: preloadBD().agency[2]
                }
            }, {
                date: new Date('06/21/16'),
                timeOff: 'holiday'
            }, {
                date: new Date('06/22/16'),
                timeOff: 'incapacitation'
            }],
    };
}

function formDataUpdate() {
    return {
        id: $('input:text[name=id]').val(),
        name: $('input:text[name=name]').val(),
        role: { name: 'rol4' },
        resume: filesData,
        skill_new: [
            { name: 'skill1' },
            { name: 'skill8' },
        ],
        skill_remove: [
            { name: 'skill0' },
            { name: 'skill9' },
        ],
        calendarPoint_new: [{
            date: new Date('06/26/16'),
            available: true,
            book: .5
        }, {
                date: new Date('05/06/16'),
                available: true,
                book: 1
            }, {
                date: new Date('05/27/16'),
                available: false,
                book: 0
            }],
        calendarPoint_remove: [{
            date: new Date('05/10/16')
        }, {
                date: new Date('05/12/16')
            }],
    };
};