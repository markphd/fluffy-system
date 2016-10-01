var Schedule = require('../models/schedule.model.js');
var moment = require('moment');
var week = moment().isoWeek();
var year = moment().year();

exports.listEveningRoster = function(req, res) {
	
	var eveningMonday,
		eveningMonday

	Schedule.find({ $and: [ { weekOfYear: 38 }, { shift: "evening" } ] }, function(err, supporters) {

    	if(err) return err;

    	eveningMonday = supporters[0].day.Monday.assigned;

    	console.log('Sunday: Evening: ' + supporters[0].day.Monday.assigned);
    	
  		res.send('Done.' + eveningMonday);
  	});

}
