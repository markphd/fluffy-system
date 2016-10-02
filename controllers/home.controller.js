var Schedule = require('../models/schedule.model.js');
var moment = require('moment');
var week = moment().isoWeek();
var year = moment().year();

exports.listEveningRoster = function(req, res) {
	
	// var eveningMonday = [];
	// var eveningMonday39;

	Schedule.find({ $and: [ { weekOfYear: 38 }, { year: 2016 } ] }, function(err, supporters) {

		// console.log(supporters);
		// var opts38 = [{ path: 'day', match: { weekOfYear: 38} }];
		// var opts39 = [{ path: 'day', match: { weekOfYear: 39} }];

    	if(err) return err;

    	// console.log(supporters);
    	
  //   	console.log(name + 'NAME');
		// console.log(name.day.Sunday + 'NAME DAY');

		var mondayAssigned = supporters.day.Sunday;

   //  	var mondayAssigned = supporters.filter(function(name) {
    		
   //  		console.log(name + 'NAME');
			// console.log(name.day.Sunday + 'NAME DAY');

   //  		// if (name.day.Sunday == 'evening') {
   //  		// 	console.log(name.day.Sunday + 'Assigned');
    			
   //  		// 
   //  		return name.day.Sunday;

   //  		// console.log('this => ', name[].day.Sunday.assigned);
   //  		// return name.shift;
   //  	})

    	// for(i in mondayAssigned){
    	// 	console.log(mondayAssigned[i] + '<==== KEYS');
    	// }


    	console.log('=>>>>>', mondayAssigned );

    	// eveningMonday39 = supporters;
    	// var week38 = Schedule.populate(supporters, [{ path: 'evening', match: { weekOfYear: 38 } }], function(err, usr) {
    	// 	console.log(usr);
    	// });
    // 	var week39 = Schedule.populate(supporters, opts39, function(err, usr) {
    // 		console.log(usr);
    // 	});
    	// console.log('This is week38: ' + week38);
  		res.render('index', { eveningMonday: mondayAssigned._id });
  	});

  	// eveningMonday.filter(function(name) {
  	// 	console.log(name)
  	// })

  	// console.log(typeof eveningMonday39)


  	// res.render('index', { eveningMonday: eveningMonday39 });

}
