var mongoose          = require('mongoose'),
    tutorialSchema    =  mongoose.Schema({
    title:            { type: String, unique: true},
    slug:             { type: String, unique: true},
    content:          { type: String, required: true },
    approval_status:  { type: Boolean, default: false},
    postedBy:         { type: String, required: true },
    created_on:       { type: Date, default: Date.now },
    update_on:        { type: Date, default: Date.now }
});

module.exports = mongoose.model('Tutorial', tutorialSchema, 'tutorials');