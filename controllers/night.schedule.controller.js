var Supporter = require('../models/supporter.model.js');
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

var ip = require('ip');
var host = ip.address();

exports.createNightRoster = function(req, res) {
	Supporter.find({}, { "_id": false }, function(err, supporters) {

    	if(err) return err;
    	var mondayRoster = supporters.filter(function(name) {
    		if (name.schedule.Monday == 'N') {
    			return name.name;
    		}
    	})

    	var tuesdayRoster = supporters.filter(function(name) {
    		if (name.schedule.Tuesday == 'N') {
    			return name.name;
    		}
    	})

    	var wednesdayRoster = supporters.filter(function(name) {
    		if (name.schedule.Wednesday == 'N') {
    			return name.name;
    		}
    	})

    	var thursdayRoster = supporters.filter(function(name) {
    		if (name.schedule.Thursday == 'N') {
    			return name.name;
    		}
    	})

    	var fridayRoster = supporters.filter(function(name) {
    		if (name.schedule.Friday == 'N') {
    			return name.name;
    		}
    	})

    	var saturdayRoster = supporters.filter(function(name) {
    		if (name.schedule.Saturday == 'N') {
    			return name.name;
    		}
    	})

    	var sundayRoster = supporters.filter(function(name) {
    		if (name.schedule.Sunday == 'N') {
    			return name.name;
    		}
    	})

		res.render('night', { 
                                title: 'Night', 
    							mondayRoster: mondayRoster,
    							tuesdayRoster: tuesdayRoster,
    							wednesdayRoster: wednesdayRoster,
    							thursdayRoster: thursdayRoster,
    							fridayRoster: fridayRoster,
    							saturdayRoster: saturdayRoster,
    							sundayRoster: sundayRoster,
    							week: week,
                                year: year,
                                monDate: monDate,
                                tueDate: tueDate,
                                wedDate: wedDate,
                                thuDate: thuDate,
                                friDate: friDate,
                                satDate: satDate,
                                sunDate: sunDate,
                                host: host  });
  	});

}
