/**
 * Load dependencies
 */

var app = require('electron').remote.app;
var Datastore = require('nedb');
var async = require('async');
var path = require('path');

/**
 * Create datastores
 */

var db = {};

db.options = new Datastore({
	filename: path.join(app.getPath('appData'), 'Attendance-Client', 'options', 'options.db'),
	autoload: true,
	onload: function(err) {
		db.options.findOne({ option: 'currentSeason' }, function(err, doc) {
			if (err) {
				console.log(err);
			} else {
				var year = (new Date()).getFullYear().toString();

				var season = doc ? doc.value || year : year;

				db.users = new Datastore({
					filename: path.join(app.getPath('appData'), 'Attendance-Client', 'seasons', season, 'users.db'),
					autoload: true
				});

				db.attendance = new Datastore({
					filename: path.join(app.getPath('appData'), 'Attendance-Client', 'seasons', season, 'attendance.db'),
					autoload: true
				});
			}
		});
	}
});

var killTime = 0;

db.options.findOne({ option: "killTime"}, function(err, doc) {
	if (doc) {
		killTime = doc.value;
	}
});

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
			if (typeof attendance[attendance.length - 1].out !== 'undefined') {
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
						var largest = docs[0];

						docs.forEach(function(doc) {
							if (doc.in > largest.in) {
								largest = doc;
							}
						});

						var query = {
							_id: largest._id
						};

						var data = {
							$set: {
								out: time
							}
						};

						db.attendance.update(query, data, function(err) {
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

function killAll() {
	var query = {
		out: {
			$exists: false
		}
	};

	var data = {
		$set: {
			out: 0,
			forced: true
		}
	};

	db.attendance.find(query, function(err, docs) {
		db.attendance.update(query, data, { multi: true }, function(err) {
			if (err) {
				console.log(err);
			}
		});

		docs.forEach(function(doc) {
			var query = {
				student: doc.student
			};

			db.users.findOne(query, function(err, doc) {
				var attendance = [];

				doc.attendance.forEach(function(data) {
					var d;

					if (data.out) {
						d = data;
					} else {
						d = {
							in: data.in,
							out: 0,
							forced: true
						};
					}

					attendance.push(d);
				});

				var data = {
					$set: {
						attendance: attendance
					}
				};

				db.users.update(query, data, function(err) {
					if (err) {
						console.log(err);
					}
				});
			});
		});
	});
}
