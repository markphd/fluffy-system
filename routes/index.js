var express = require('express');
var router = express.Router();
var Supporter = require('../models/supporter.model.js');
var Schedule = require('../models/schedule.model.js');
var homeCtrl = require('../controllers/home.controller.js');
var morningScheduleCtrl = require('../controllers/morning.schedule.controller.js');
var eveningScheduleCtrl = require('../controllers/evening.schedule.controller.js');
var nightScheduleCtrl = require('../controllers/night.schedule.controller.js');
var moment = require('moment');
var week = moment().isoWeek();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { week: week });
  return homeCtrl.listEveningRoster(req, res);
});

// GET MORNING VIEW
router.get('/morning', function(req, res, next) {
  return morningScheduleCtrl.createMorningRoster(req, res);
});

// GET EVENING VIEW
router.get('/evening', function(req, res, next) {
  return eveningScheduleCtrl.createEveningRoster(req, res);
});

// GET NIGHT VIEW
router.get('/night', function(req, res, next) {
  return nightScheduleCtrl.createNightRoster(req, res);
});

// GET EVENING VIEW
router.post('/evening', function(req, res, next) {
  console.log('This is evening POST request');
  Schedule.find({ $and: [ { weekOfYear: week }, { shift: "evening" } ] }).count(function (err, doc) {
  	var counter = doc;
  	console.log('This is count: ' + counter );
  	if (doc === 0) {
  		new Schedule({
  			year: req.body.year,
  			weekOfYear: req.body.week,
  			shift: req.body.shift,
  			day: {
  				Monday: {
  					assigned: req.body.Monday
  				},
  				Tuesday: {
  					assigned: req.body.Tuesday
  				},
  				Wednesday: {
  					assigned: req.body.Wednesday
  				},
  				Thursday: {
  					assigned: req.body.Thursday
  				},
  				Friday: {
  					assigned: req.body.Friday
  				},
  				Saturday: {
  					assigned: req.body.Saturday
  				},
  				Sunday: {
  					assigned: req.body.Sunday
  				}
  			}
  		}).save();
  		console.log('New schedule successfully saved.');
  		res.redirect('/');
  	} else {
  		console.log('Already created');
  		res.redirect('/admin');
  	}
  });
  
  // console.log('This is count: ' + counter );
});


module.exports = router;