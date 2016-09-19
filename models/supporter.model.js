var mongoose = require('mongoose');

var supporterSchema = mongoose.Schema({
      name: String,
      location: String,
      schedule: Object,
      isMail: { type: Boolean, default: false }
  });

module.exports = mongoose.model('Supporter', supporterSchema);