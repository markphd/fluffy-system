var express = require('express');
var router = express.Router();
var moment = require('moment');
var week = moment().isoWeek();

/* GET Admin page */
router.get('/', function(req, res, next) {
  res.render('admin', { week: week });
});

router.post('/', function(req, res) {
	res.setHeader('Content-Type', 'text/plain');
	res.write('you posted:\n');
	res.end(JSON.stringify(req.body, null, 2));
})

module.exports = router;
