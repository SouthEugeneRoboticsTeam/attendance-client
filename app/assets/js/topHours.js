var app = require('electron').remote.app;
var Datastore = require('nedb');

/**
 * Create datastores
 */
initAll(function() {
    var individualHours = [];

    db.users.find({}, function(err, docs) {
        if (err) {
            console.log(err);
        } else {
            individualHours = []
            docs.forEach(function(user) {
                var totalTime = 0;
                user.attendance.forEach(function(session) {
                    if (session.out) {
                        totalTime += session.out - session.in;
                    }
                });
                individualHours.push({
                    name: user.name,
                    total: totalTime
                });
            });
            individualHours.sort(sortBy("total"));

            var userAmount = 0;
            if (individualHours.length < 10) {
                userAmount = individualHours.length;
            }
            if (userAmount == 0) {
                userAmount = individualHours.length - 1;
            }
            $("#top-table-body").html("");
            for (i = 0; i < userAmount; i++) {
                var userTime = individualHours[i].total;
                var sec_num = parseInt(userTime / 1000);
                var hours = Math.floor(sec_num / 3600);
                var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
                var seconds = sec_num - (hours * 3600) - (minutes * 60);

                var time = hours + ' hours and ' + minutes + ' minutes.';
                var data = "<tr> <td>" + individualHours[i].name + "</td> <td>" + time + "</td> </tr>";

                $("#top-table-body").append(data);
            }
        }
    });



    function sortBy(prop) {
        return function(a, b) {
            if (a[prop] > b[prop]) {
                return -1;
            } else if (a[prop] < b[prop]) {
                return 1;
            }
            return 0;
        }
    }
});
