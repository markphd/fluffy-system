var Schedule = require('../models/schedule.model.js');
var moment = require('moment');
var week = moment().isoWeek();
var year = moment().year();
var monDate = moment().year(year).isoWeekday(1).isoWeek(week).format("D");
var tueDate = moment().year(year).isoWeekday(2).isoWeek(week).format("D");
var wedDate = moment().year(year).isoWeekday(3).isoWeek(week).format("D");
var thuDate = moment().year(year).isoWeekday(4).isoWeek(week).format("D");
var friDate = moment().year(year).isoWeekday(5).isoWeek(week).format("D");
var satDate = moment().year(year).isoWeekday(6).isoWeek(week).format("D");
var sunDate = moment().year(year).isoWeekday(7).isoWeek(week).format("D");

console.log('This is sundate:', sunDate)

// console.log(monDate, "monDate");

exports.listEveningRoster = function(req, res) {

	Schedule.find({ weekOfYear: week }, function(err, supporters) {

    if(err) return err;

		// var mondayAssigned = 'N/A';
		// var tuesdayAssigned = 'N/A';
		// var wednesdayAssigned = 'N/A';
		// var thursdayAssigned = 'N/A';
		// var fridayAssigned = 'N/A';
		// var saturdayAssigned = 'N/A';
		// var sundayAssigned = 'N/A';

		var morningRoster = {
      "day" : {
          "Sunday" : {
            "assigned" : "N/A"
          },
          "Saturday" : {
            "assigned" : "N/A"
          },
          "Friday" : {
            "assigned" : "N/A"
          },
          "Thursday" : {
            "assigned" : "N/A"
          },
          "Wednesday" : {
            "assigned" : "N/A"
          },
          "Tuesday" : {
            "assigned" : "N/A"
          },
          "Monday" : {
            "assigned" : "N/A"
          }
    }};

    var eveningRoster = {
      "day" : {
          "Sunday" : {
            "assigned" : "N/A"
          },
          "Saturday" : {
            "assigned" : "N/A"
          },
          "Friday" : {
            "assigned" : "N/A"
          },
          "Thursday" : {
            "assigned" : "N/A"
          },
          "Wednesday" : {
            "assigned" : "N/A"
          },
          "Tuesday" : {
            "assigned" : "N/A"
          },
          "Monday" : {
            "assigned" : "N/A"
          }
    }};

    var nightRoster = {
      "day" : {
          "Sunday" : {
            "assigned" : "N/A"
          },
          "Saturday" : {
            "assigned" : "N/A"
          },
          "Friday" : {
            "assigned" : "N/A"
          },
          "Thursday" : {
            "assigned" : "N/A"
          },
          "Wednesday" : {
            "assigned" : "N/A"
          },
          "Tuesday" : {
            "assigned" : "N/A"
          },
          "Monday" : {
            "assigned" : "N/A"
          }
    }};

    	supporters.filter(function(name) {

    		if (name.shift == 'morning') {
    			morningRoster = name;
    		} else if (name.shift == 'evening') {
    			eveningRoster = name;
    		} else {
    			nightRoster = name;
    		}

   			// mondayAssigned = name.day.Monday.assigned;
   			// tuesdayAssigned = name.day.Tuesday.assigned;
   			// wednesdayAssigned = name.day.Wednesday.assigned;
   			// thursdayAssigned = name.day.Thursday.assigned;
   			// fridayAssigned = name.day.Friday.assigned;
   			// saturdayAssigned = name.day.Saturday.assigned;
   			// sundayAssigned = name.day.Sunday.assigned;
    	})

    	// console.log(morningRoster.day.Sunday.assigned)
    	// console.log(eveningRoster.day.Sunday.assigned)
    	// console.log(nightRoster.day.Sunday.assigned)

  		res.render('index', { 
  					// mondayAssigned: mondayAssigned, 
  					// tuesdayAssigned: tuesdayAssigned,
  					// wednesdayAssigned: wednesdayAssigned,
  					// thursdayAssigned: thursdayAssigned,
  					// fridayAssigned: fridayAssigned,
  					// saturdayAssigned: saturdayAssigned,
  					// sundayAssigned: sundayAssigned,
            morningRoster: morningRoster,
            eveningRoster: eveningRoster,
            nightRoster: nightRoster,
  					week: week,
            monDate: monDate,
            tueDate: tueDate,
            wedDate: wedDate,
            thuDate: thuDate,
            friDate: friDate,
            satDate: satDate,
            sunDate: sunDate });
  	});

}
