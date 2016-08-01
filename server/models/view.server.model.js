var mongoose         = require('mongoose'),
    viewSchema       =  mongoose.Schema({
    public_id:         { type: String, required: true  },
    counter:           { type: Number, required: true, default: 0 },
});

module.exports = mongoose.model('View', viewSchema, 'views');
