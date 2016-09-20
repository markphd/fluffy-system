var express = require('express');
var router = express.Router();
var Supporter = require('../models/supporter.model.js');
var morningScheduleCtrl = require('../controllers/morning.schedule.controller.js');
var eveningScheduleCtrl = require('../controllers/evening.schedule.controller.js');
var nightScheduleCtrl = require('../controllers/night.schedule.controller.js');
var moment = require('moment');
var week = moment().isoWeek();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { week: week });
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

module.exports = router;