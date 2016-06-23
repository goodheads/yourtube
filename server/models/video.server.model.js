var mongoose          = require('mongoose'),
    videoSchema       =  mongoose.Schema({
    title:               { type: String },
    public_id:           { type: String, required: true },
    description:         { type: String, required: true },
    url:                 { type: String, required: true },
    duration:            { type: Number, required: true },
    format:              { type: String, required: true },
    time_uploaded:       { type: Date, default: Date.now }
});

module.exports = mongoose.model('Video', videoSchema, 'videos');
