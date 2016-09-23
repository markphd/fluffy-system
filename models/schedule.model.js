var mongoose = require('mongoose');

var scheduleSchema = mongoose.Schema({
      year: Number,
      weekOfYear: Number,
      shift: String,
      day: {
      	Monday: {
      		assigned: { type: String, default: 'N/A' }
      	},
      	Tuesday: {
      		assigned: { type: String, default: 'N/A' }
      	},
      	Wednesday: {
      		assigned: { type: String, default: 'N/A' }
      	},
      	Thursday: {
      		assigned: { type: String, default: 'N/A' }
      	},
      	Friday: {
      		assigned: { type: String, default: 'N/A' }
      	},
      	Saturday: {
      		assigned: { type: String, default: 'N/A' }
      	},
      	Sunday: {
      		assigned: { type: String, default: 'N/A' }
      	}
      }
  });

module.exports = mongoose.model('Schedule', scheduleSchema);