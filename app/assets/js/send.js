/**
 * Load dependencies
 */

var jetpack = _interopDefault(require('fs-jetpack'));

var appDir = jetpack.cwd(app.getAppPath());
var manifest = appDir.read('package.json', 'json');
var env = manifest.env;

/**
 * Do polls every X seconds
 */

setInterval(function() {
	var base = env.url || "127.0.0.1";

	db.attendance.find({}, function(err, docs) {
		docs.forEach(function(doc) {
			if (doc.in && doc.out) {
				var url = base;

				async.waterfall([
					function(done) {
						$.ajax({
							type: "GET",
							url: genUrl(base, ["users", doc.student]),
							success: function(resp) {
								if (resp && resp.success) {
									if (resp.response) {
										done(null, true);
									} else {
										done(null, false);
									}
								} else {
									done(new Error("Response failed"));
								}
							}
						});
					},
					function(data, done) {
						if (data) {
							$.ajax({
								type: "PUT",
								url: genUrl(base, ["users", doc.student]),
								data: {
									in: doc.in,
									out: doc.out
								},
								success: function() {
									db.attendance.remove({ _id: doc._id }, function(err) {
										if (err) {
											console.log(err);
										}
									});
								}
							});
						} else {
							async.waterfall([
								function(done) {
									$.ajax({
										type: "POST",
										url: genUrl(base, ["users"]),
										data: {
											studentid: doc.student,
											name: doc.name
										},
										success: function(resp) {
											if (resp && resp.success) {
												done(null);
											} else {
												done(err);
											}
										}
									});
								},
								function(done) {
									$.ajax({
										type: "PUT",
										url: genUrl(base, ["users", doc.student]),
										data: {
											in: doc.in,
											out: doc.out
										},
										success: function() {
											db.attendance.remove({ _id: doc._id }, function(err) {
												if (err) {
													done(err);
												} else {
													done(null);
												}
											});
										}
									});
								}
							]);
						}
					}
				]);
			}
		});
	});
}, 120 * 1000);

/**
 * Define functions
 */

function genUrl(base, path) {
	if (!/^(f|ht)tps?:\/\//i.test(base)) {
		base = "http://" + base;
	}

	if (!/\/$/i.test(base)) {
		base = base + "/";
	}

	return base + path.join("/");
}

function _interopDefault(ex) {
	return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex;
}
