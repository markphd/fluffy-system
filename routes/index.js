var express = require('express');
var router = express.Router();
var Supporter = require('../models/supporter.model.js');
var scheduleCtrl = require('../controllers/morning.schedule.controller.js');
var moment = require('moment');
var week = moment().isoWeek();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { week: week });
});

// GET MORNING VIEW
router.get('/morning', function(req, res, next) {
  return scheduleCtrl.createMorningRoster(req, res);
});

module.exports = router;