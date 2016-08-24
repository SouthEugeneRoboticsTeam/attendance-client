(function () {
	var electron = require('electron');
	var remote = electron.remote;
	var os = require('os');
	var BrowserWindow = electron.BrowserWindow;

	function initTitleBar() {
		$("#title-bar").show();

		$("min-btn").click(function() {
			var window = BrowserWindow.getFocusedWindow();
			window.minimize();
		});

		$("max-btn").click(function() {
			var window = BrowserWindow.getFocusedWindow();
			window.maximize();
		});

		$("close-btn").click(function() {
			var window = BrowserWindow.getFocusedWindow();
			window.close();
		});
	}

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
						} else {
							$("#submit").text("Sign Out");
							$("#submit").attr("class", "btn sign-in btn-danger");
						}
					});
				} else {
					$("#submit").text("New User");
					$("#submit").attr("class", "btn sign-in btn-info");
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
						signIn(studentid, function(err, name) {
							if (err) {
								console.log(err);
							} else {
								swal({
									type: 'success',
									title: 'Signed In',
									text: name + ', you have successfully signed in!',
									timer: 2000
								});

								clearSubmit();
							}
						});
					} else {
						signOut(studentid, function(err, name) {
							if (err) {
								console.log(err);
							} else {
								swal({
									type: 'warning',
									title: 'Signed Out',
									text: name + ', you have successfully signed out!',
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
							signIn(studentid, function(err, name) {
								if (err) {
									console.log(err);
								} else {
									swal({
										type: 'success',
										title: 'Signed In',
										text: name + ', you have successfully signed in!',
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
							var sec_num = parseInt(totalTime);
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

	function clearSubmit() {
		$('#student-id').val('');

		$("#submit").text("Sign In/Out");
		$("#submit").attr("class", "btn sign-in btn-primary");
	}
})();
