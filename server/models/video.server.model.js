var mongoose          = require('mongoose'),
    videoSchema       =  mongoose.Schema({
    title:               { type: String },
    public_id:           { type: String, required: true },
    description:         { type: String, required: true },
    url:                 { type: String, required: true },
    duration:            { type: Number, required: true },
    format:              { type: String, required: true },
    width:               { type: Number, required: true },
    height:              { type: Number, required: true },
    uploaded_by:         { type: String, required: true },
    views:               { type: Number, required: true },
    time_uploaded:       { type: Date, default: Date.now }
});

module.exports = mongoose.model('Video', videoSchema, 'videos');
