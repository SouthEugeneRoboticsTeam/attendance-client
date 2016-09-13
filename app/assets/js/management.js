/**
 * Load dependencies
 */

var app = require('electron').remote.app;
var Datastore = require('nedb');
var async = require('async');

/**
 * Create datastores
 */

var db = {};

db.users = new Datastore(app.getPath('appData') + '/' + app.getName() + '/datastore/users.db');
db.attendance = new Datastore(app.getPath('appData') + '/' + app.getName() + '/datastore/attendance.db');

db.users.loadDatabase();
db.attendance.loadDatabase();

/**
 * Define functions
 */

function checkExists(studentid, callback) {
	var query = {
		student: studentid
	};

	db.users.findOne(query, function(err, doc) {
		if (err || !doc) {
			callback(false);
		} else {
			callback(true);
		}
	});
}

function checkState(studentid, callback) {
	var query = {
		student: studentid
	}

	db.users.findOne(query, function(err, doc) {
		var attendance = doc.attendance;

		if (attendance.length) {
			if (attendance[attendance.length - 1].out) {
				callback(true);
			} else {
				callback(false);
			}
		}
	});
}

function checkHours(studentid, callback){
	var query = {
		student: studentid
	}

	db.users.findOne(query, function(err, doc) {
		if (err) {
			callback(err);
		} else {
			var attendance = doc.attendance;

			if (attendance.length) {
				var totalTime = 0;
				attendance.forEach(function(session){
					if (session.out) {
						totalTime += session.out - session.in;
					}
				});

				callback(null, totalTime)
			}
		}
	});
}

function create(studentid, name, callback) {
	var mentor = $('#mentor-box').is(":checked");
	var data = {
		student: studentid,
		name: name,
		mentor: mentor,
		attendance: []
	};

	db.users.insert(data, function(err) {
		if (err) {
			callback(err);
		} else {
			callback();
		}
	});
}

function signIn(studentid, callback) {
	var d = new Date();
	var time = d.getTime();

	var query = {
		student: studentid
	};

	async.parallel([
		function(done) {
			var data = {
				$push: {
					attendance: {
						in: time
					}
				}
			};

			db.users.update(query, data, function(err) {
				if (err) {
					done(err);
				} else {
					db.users.findOne(query, function(err, doc) {
						done(null, doc);
					});
				}
			});
		},
		function(done) {
			db.users.findOne(query, function(err, doc) {
				if (err) {
					done(err);
				} else {
					db.attendance.insert({
						student: studentid,
						name: doc.name,
						in: time
					}, function(err) {
						if (err) {
							done(err);
						} else {
							done(null);
						}
					});
				}
			});
		}
	], function(err, results) {
		if (err) {
			callback(err);
		} else {
			callback(null, results[0]);
		}
	});
}

function signOut(studentid, callback) {
	var d = new Date();
	var time = d.getTime();

	var query = {
		student: studentid
	};

	async.parallel([
		function(done) {
			db.users.findOne(query, function(err, doc) {
				if (err) {
					done(err);
				} else {
					var attendance = doc.attendance;

					if (attendance.length) {
						attendance[attendance.length - 1].out = d.getTime();

						db.users.update(query, {
							$set: {
								attendance: attendance
							}
						}, function(err) {
							if (err) {
								done(err);
							} else {
								done(null, doc);
							}
						});
					}
				}
			});
		},
		function(done) {
			db.attendance.find(query, function(err, docs) {
				if (err) {
					done(err);
				} else {
					if (docs.length) {
						db.attendance.update({
							_id: docs[docs.length - 1]._id
						}, {
							$set: {
								out: time
							}
						}, function(err) {
							if (err) {
								done(err);
							} else {
								done(null)
							}
						});
					}
				}
			});
		}
	], function(err, results) {
		if (err) {
			callback(err);
		} else {
			callback(null, results[0]);
		}
	});
}

function killAll(callback) {

}
