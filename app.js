var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

// database connection
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/schedule');
var db = mongoose.connection;
var Supporter = require('./models/supporter.model.js');

// database empty collection
var removeSupporters = function(db, callback) {
  db.collection('supporters').deleteMany({

  }, function(err, results) {
    console.log('Deleted successfully.');
    callback();
  })
}

var request = require('request');
var CryptoJS = require("crypto-js");
var cheerio = require('cheerio');
var moment = require('moment');
var week = moment().isoWeek();

// User Credentials
var user = 'mpd';
var bytes  = CryptoJS.AES.decrypt('U2FsdGVkX188HHWmM0mEBlrlv12DpRiURMke0mzV+90=', '7013254dca77e2c913d18cf5b70e7bba');
var password = bytes.toString(CryptoJS.enc.Utf8);


// Schedule Source
var scheduleDubai = 'https://' + user + ':' + password + '@supportkb.one.com/teams/english/schedule/';
var getScheduleDubai = 'https://' + user + ':' + password + '@supportkb.one.com/teams/english/schedule/getschedule.php';


// Populate Data
request(scheduleDubai, {timeout: 6500}, function (error, reqs, body) {    
  if (!error && reqs.statusCode == 200) {
    request.post({
      headers: { 'Content-Type' : 'application/x-www-form-urlencoded' },
      url:     getScheduleDubai,
      form: {
        year: '2016',
        week: week
      }
    }, function(e, r, b){
      var $ = cheerio.load(b);
      var supporterNumber = $('[title="Supporter"]').closest('tr').length;

      function removeTextFormatting(text) {
        return text.replace(/[\n\t\r]/g," ");
      }

      function createSupporter(num) {
        for (var i = num - 1; i >= 0; i--) {
          var supporter = $('[title="Supporter"]').closest('tr').eq(i).text();
          var unformattedSupporter = removeTextFormatting(supporter);
          var supporterArray = unformattedSupporter.trim().split(/   /g);        

          new Supporter({ "name": supporterArray[0], "location": supporterArray[1], 
                          "schedule": {
                            'Monday': supporterArray[2],
                            'Tuesday': supporterArray[3],
                            'Wednesday': supporterArray[4],
                            'Thursday': supporterArray[5],
                            'Friday': supporterArray[6],
                            'Saturday': supporterArray[7],
                            'Sunday': supporterArray[8]
                          }}).save();
          console.log("Created successfully.");
        }

      }
      
      removeSupporters(db, function(res) {
        console.log('Removed');
      });

      createSupporter(supporterNumber);
      
      //  console.log(supporters);

      // morningShift.each(function(doc) {
      //   console.log(doc);
      // })
      var eveningShift = Supporter.find({ "schedule.Sunday": "E"}, { "name": true, "_id": false });
      var nightShift = Supporter.find({ "schedule.Sunday": "N"}, { "name": true, "_id": false });
      // console.log(morningShift);
    }); 
  }
})





var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
