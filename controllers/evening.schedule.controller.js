var Supporter = require('../models/supporter.model.js');
var moment = require('moment');
var week = moment().isoWeek();

exports.createEveningRoster = function(req, res) {
	Supporter.find({}, { "_id": false }, function(err, supporters) {

    	if(err) return err;
    	var mondayRoster = supporters.filter(function(name) {
    		if (name.schedule.Monday == 'E') {
    			return name.name;
    		}
    	})

    	var tuesdayRoster = supporters.filter(function(name) {
    		if (name.schedule.Tuesday == 'E') {
    			return name.name;
    		}
    	})

    	var wednesdayRoster = supporters.filter(function(name) {
    		if (name.schedule.Wednesday == 'E') {
    			return name.name;
    		}
    	})

    	var thursdayRoster = supporters.filter(function(name) {
    		if (name.schedule.Thursday == 'E') {
    			return name.name;
    		}
    	})

    	var fridayRoster = supporters.filter(function(name) {
    		if (name.schedule.Friday == 'E') {
    			return name.name;
    		}
    	})

    	var saturdayRoster = supporters.filter(function(name) {
    		if (name.schedule.Saturday == 'E') {
    			return name.name;
    		}
    	})

    	var sundayRoster = supporters.filter(function(name) {
    		if (name.schedule.Sunday == 'E') {
    			return name.name;
    		}
    	})

		res.render('evening', { title: 'Evening', 
													mondayRoster: mondayRoster,
													tuesdayRoster: tuesdayRoster,
													wednesdayRoster: wednesdayRoster,
													thursdayRoster: thursdayRoster,
													fridayRoster: fridayRoster,
													saturdayRoster: saturdayRoster,
													sundayRoster: sundayRoster,
													week: week } );
  	});

}
