/**
 * Load dependencies
 */

var electron = require('electron');
var os = require('os');

var remote = electron.remote;
var BrowserWindow = electron.BrowserWindow;

/**
 * Startup
 */

$(document).ready(function() {
	if (!(os.platform() === 'darwin' && os.release().split('.')[0] >= 10)) {
		initTitleBar();
	}
});

$("#student-id").on("input", function() {
	var studentid = $("#student-id").val();

	if (studentid) {
		checkExists(studentid, function(exists) {
			if (exists) {
				checkState(studentid, function(state) {
					if (state) {
						$("#submit").text("Sign In");
						$("#submit").attr("class", "btn sign-in btn-success");
						$("#student-id-div").attr("class", "form-group has-success");
					} else {
						$("#submit").text("Sign Out");
						$("#submit").attr("class", "btn sign-in btn-danger");
						$("#student-id-div").attr("class", "form-group has-error");
					}
				});
			} else {
				$("#submit").text("New User");
				$("#submit").attr("class", "btn sign-in btn-info");
				$("#student-id-div").attr("class", "form-group");
			}
		});
	} else {
		clearSubmit();
	}
});

$("#submit").click(function() {
	var studentid = $("#student-id").val();

	checkExists(studentid, function(exists) {
		if (exists) {
			checkState(studentid, function(state) {
				if (state) {
					signIn(studentid, function(err, user) {
						if (err) {
							console.log(err);
						} else {
							swal({
								type: 'success',
								title: 'Signed In',
								text: user.name + ', you have successfully signed in!',
								timer: 2000
							});

							clearSubmit();
						}
					});
				} else {
					signOut(studentid, function(err, user) {
						if (err) {
							console.log(err);
						} else {
							swal({
								type: 'warning',
								title: 'Signed Out',
								text: user.name + ', you have successfully signed out!',
								timer: 2000
							});

							clearSubmit();
						}
					});
				}
			});
		} else {
			swal({
				type: 'warning',
				title: 'Create Account',
				text: 'Enter your full name.',
				input: 'text',
				html: '<input type="checkbox" data-toggle="checkbox" id="mentor-box">&nbsp;&nbsp;Mentor</input>',
				showCancelButton: true,
				inputValidator: function(value) {
					return new Promise(function(resolve, reject) {
						if (value && isNaN(value)) {
							resolve();
						} else {
							reject('Please enter your name!');
						}
					});
				}
			}).then(function(result) {
				create(studentid, result, function(err) {
					if (err) {
						console.log(err);
					} else {
						signIn(studentid, function(err, user) {
							if (err) {
								console.log(err);
							} else {
								swal({
									type: 'success',
									title: 'Signed In',
									text: user.name + ', you have successfully signed in!',
									timer: 2000
								});

								clearSubmit();
							}
						});
					}
				});
			});
		}
	});
});

$("#check-hours").click(function() {
	var studentid = $("#student-id").val();

	checkExists(studentid, function(exists) {
		if (exists) {
			checkState(studentid, function(state) {
				checkHours(studentid, function (err, totalTime){
					if (err){
						console.log(err);
					} else {
						var sec_num = parseInt(totalTime / 1000);
						var hours = Math.floor(sec_num / 3600);
						var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
						var seconds = sec_num - (hours * 3600) - (minutes * 60);

						if (hours < 10) {hours   = "0"+hours;}
						if (minutes < 10) {minutes = "0"+minutes;}
						if (seconds < 10) {seconds = "0"+seconds;}
						//seconds for testing, remove in final version
						swal({
							type: 'info',
							//title: 'Records Found',
							text: 'You have spent ' + hours + ':' + minutes + ':' + seconds + ' in the shop.',
							timer: 5000
						});

						clearSubmit();
					}
				});
			});
		} else {
			swal({
				type: 'warning',
				title: 'Account Not Found',
				text: 'Please enter a valid account!'
			});

			clearSubmit();
		}
	});
});

/**
 * Enable some Bootstrap/Flat-UI features
 */

// Custom Selects
if ($("[data-toggle=\"select\"]").length) {
	$("[data-toggle=\"select\"]").select2();
}

// Checkboxes and Radio buttons
$("[data-toggle=\"checkbox\"]").radiocheck();
$("[data-toggle=\"radio\"]").radiocheck();

// Tooltips
$("[data-toggle=\"tooltip\"]").tooltip("show");

// Switches
if ($("[data-toggle=\"switch\"]").length) {
	$("[data-toggle=\"switch\"]").bootstrapSwitch();
}

/**
 * Define functions
 */

function initTitleBar() {
	$("#title-bar-btns").show();
	$("#title").show();

	$("#min-btn").click(function() {
		var window = remote.getCurrentWindow();
		window.minimize();
	});

	$("#max-btn").click(function() {
		var window = remote.getCurrentWindow();
		window.maximize();
	});

	$("#close-btn").click(function() {
		var window = remote.getCurrentWindow();
		window.close();
	});
}

function clearSubmit() {
	$('#student-id').val('');

	$("#submit").text("Sign In/Out");
	$("#submit").attr("class", "btn sign-in btn-primary");
	$("#student-id-div").attr("class", "form-group");
}
