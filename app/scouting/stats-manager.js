var Datastore = require('nedb');

//var teamdb = new Datastore({ filename: __dirname + '/datastore/teams.db', autoload: true });

var barChartData = {
    labels : ["369","1425","2521","2522","3131","3672","5085"],
    datasets : [
        {
            fillColor : "rgba(220,220,220,0.5)",
            strokeColor : "rgba(220,220,220,0.8)",
            highlightFill: "rgba(220,220,220,0.75)",
            highlightStroke: "rgba(220,220,220,1)",
            data : [145*.33,242*.33,199*.33,98*.30,120*.81,30*1,102*.10]
        },
        {
            fillColor : "rgba(151,187,205,0.5)",
            strokeColor : "rgba(151,187,205,0.8)",
            highlightFill : "rgba(151,187,205,0.75)",
            highlightStroke : "rgba(151,187,205,1)",
            data : [78*.66,145*.05,45*.1,112*.45,190*.5,124*.35,188*.65]
        }
    ]
};

window.onload = function() {
    var ctx = document.getElementById("stats-canvas").getContext("2d");
    window.myBar = new Chart(ctx).Bar(barChartData, {
        responsive : true
    });
};
