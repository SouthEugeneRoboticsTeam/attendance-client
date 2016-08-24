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
		check(function(exists) {
			if (exists) {
				checkState(function(state) {
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

	});

	$("#submit").click(function() {
		check(function(exists) {
			if (exists) {
				checkState(function(state) {
					if (state) { //if state is true, then they have signed out
						signIn(function(err, name) {
							if (err) {
								console.log(err);
							} else {
								swal({
									type: 'success',
									title: 'Signed In',
									text: name + ', you have successfully signed in!',
									timer: 2000
								});

								$("#submit").text("Sign In/Out");
								$("#submit").attr("class", "btn sign-in btn-primary");
							}
						});
					} else {
						signOut(function(err, name) {
							if (err) {
								console.log(err);
							} else {
								swal({
									type: 'warning',
									title: 'Signed Out',
									text: name + ', you have successfully signed out!',
									timer: 2000
								});

								$("#submit").text("Sign In/Out");
								$("#submit").attr("class", "btn sign-in btn-primary");
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
					create(result, function(err) {
						if (err) {
							console.log(err);
						} else {
							signIn(function(err, name) {
								if (err) {
									console.log(err);
								} else {
									swal({
										type: 'success',
										title: 'Signed In',
										text: name + ', you have successfully signed in!',
										timer: 2000
									});

									$("#submit").text("Sign In/Out");
									$("#submit").attr("class", "btn sign-in btn-primary");
								}
							});
						}
					});
				});
			}
		});
	});
})();
