var mongoose   = require('mongoose'),
    secrets    = require('./secrets');

var db = mongoose.connection;
mongoose.connect(secrets.db);

module.exports = {
  dbconnect: function(){
    db.on('error', console.error.bind( console, 'MongoDB Connection Error. Please make sure that MongoDB is running.'));
    db.once('open', function callback(){
      console.log('Yourtube db opened');
    });
  }
};
