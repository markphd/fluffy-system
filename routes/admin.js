var express = require('express');
var router = express.Router();
var moment = require('moment');
var week = moment().isoWeek();
var Schedule = require('../models/schedule.model.js');

/* GET Admin page */
router.get('/', function(req, res, next) {
  res.render('admin', { week: week });
});

router.post('/', function(req, res) {
	console.log('This is req object', req.body);
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
})

module.exports = router;
