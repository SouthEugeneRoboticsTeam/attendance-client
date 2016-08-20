var Datastore = require('nedb');
var shasum = require('shasum');

var jetpack = _interopDefault(require('fs-jetpack'));

var users = new Datastore({ filename: __dirname + '/datastore/users.db', autoload: true });

var app$1;
if (process.type === 'renderer') {
	app$1 = require('electron').remote.app;
} else {
	app$1 = require('electron').app;
}

var appDir = jetpack.cwd(app$1.getAppPath());
var manifest = appDir.read('package.json', 'json');
var env = manifest.env;

function check(callback) {
	var studentid = $('#student-id').val();

	var query = {
		student: shasum(studentid)
	};

	users.findOne(query, function(err, doc) {
		if (err || !doc) {
			callback(false);
		} else {
			callback(true);
		}
	});
}

function create(name, callback) {
	var studentid = $('#student-id').val();

	var data = {
		student: shasum(studentid),
		name: name,
		attendance: []
	};

	users.insert(data, function(err) {
		if (err) {
			callback(err);
		} else {
			callback();
		}
	});
}

function signIn(callback) {
	var studentid = $('#student-id').val();
	$('#student-id').val('');

	var d = new Date();

	var query = {
		student: shasum(studentid)
	};

	var data = {
		$push: {
			attendance: {
				signin: Math.floor(d.getTime() / 1000),
				signout: 0
			}
		}
	};

	users.update(query, data, function(err) {
		if (err) {
			callback(err);
		} else {
			users.findOne(query, function(err, doc) {
				callback(null, doc.name);
			});
		}
	});
}

function signOut(callback) {
	var studentid = $('#student-id').val();
	$('#student-id').val('');

	var d = new Date();

	var query = {
		student: shasum(studentid)
	};

	users.findOne(query, function(err, doc) {
		if (err) {
			callback(err);
		} else {
			var attendance = doc.attendance;

			if (attendance.length) {
				attendance[attendance.length - 1].signout = Math.floor(d.getTime() / 1000);

				users.update(query, {
					$set: {
						attendance: attendance
					}
				}, function(err) {
					if (err) {
						callback(err);
					} else {
						callback(null, doc.name);
					}
				});
			}
		}
	});
}

function _interopDefault(ex) {
	return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex;
}
