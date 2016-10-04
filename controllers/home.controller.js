var Schedule = require('../models/schedule.model.js');
var moment = require('moment');
var week = moment().isoWeek();
var year = moment().year();

exports.listEveningRoster = function(req, res) {

	Schedule.find({ weekOfYear: week }, function(err, supporters) {

    	if(err) return err;

    	
		var mondayAssigned = 'N/A';
		var tuesdayAssigned = 'N/A';
		var wednesdayAssigned = 'N/A';
		var thursdayAssigned = 'N/A';
		var fridayAssigned = 'N/A';
		var saturdayAssigned = 'N/A';
		var sundayAssigned = 'N/A';

    	supporters.filter(function(name) {

    		console.log('SHIFT: ', supporters.shift)
    		
   			mondayAssigned = name.day.Monday.assigned;
   			tuesdayAssigned = name.day.Tuesday.assigned;
   			wednesdayAssigned = name.day.Wednesday.assigned;
   			thursdayAssigned = name.day.Thursday.assigned;
   			fridayAssigned = name.day.Friday.assigned;
   			saturdayAssigned = name.day.Saturday.assigned;
   			sundayAssigned = name.day.Sunday.assigned;

    	})

  		res.render('index', { 
  					mondayAssigned: mondayAssigned, 
  					tuesdayAssigned: tuesdayAssigned,
  					wednesdayAssigned: wednesdayAssigned,
  					thursdayAssigned: thursdayAssigned,
  					fridayAssigned: fridayAssigned,
  					saturdayAssigned: saturdayAssigned,
  					sundayAssigned: sundayAssigned,
  					week: week });
  	});

}
