var express = require('express');
var router = express.Router();
var moment = require('moment');
var week = moment().isoWeek();
var Supporter = require('../models/supporter.model.js');

/* GET Admin page */
router.get('/', function(req, res, next) {
  res.render('admin', { week: week });
});

router.post('/', function(req, res) {
	console.log(req);
	// console.log(res);
	res.setHeader('Content-Type', 'text/plain');
	res.write('you posted:\n');
	res.end(JSON.stringify(req.body, null, 2));
	// console.log('THIS:' + req.body.Friday );
	// new Schedule(JSON.stringify(req.body, null, 2)).save();
	return console.log(req.body)
})

module.exports = router;
