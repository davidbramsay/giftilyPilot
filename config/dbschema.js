var mongoose = require('mongoose');
/////////////////////////////////// DB SETUP ///////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////

var uristring = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 
  'mongodb://localhost/giftilyPilot';

var mongoOptions = { db: { safe: true }};

mongoose.connect(uristring, mongoOptions, function (err, res) {
  if (err) { console.log ('ERROR connecting to: ' + uristring + '. ' + err);
  } else { console.log ('Successfully connected to: ' + uristring); }
});


///////////////////////////////// DB SCHEMAS ///////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////

var Schema = mongoose.Schema;


// User schema
var userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: {type: String, required: false },
  address: { type: String, required: true },
  gender: { type: String, required: true },
  cardPreference: { type: String, required: true },
  whoFrom: { type: String, required: true },
  fathersAddress: {type: String, required: false }
  });


// Export models
var userModel = mongoose.model('User', userSchema);
exports.userModel = userModel;


exports.mongoose = mongoose;
