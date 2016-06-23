var secrets       = require('../../config/secrets'),
    slug          = require('slug'),
    Video         = require('../models/video.server.model');

module.exports = {
  /**
   * Saves A New Video Details Posted By User
   * @param  {void}   req
   * @param  {void}   res
   * @param  {Function} next
   * @return {object}
   */
  create: function(req, res){
    var video = new Video({
      title: req.body.title,
      public_id: req.body.public_id,
      description: req.body.description,
      url: req.body.url,
      duration: req.body.duration,
      format: req.body.format
    });

    video.save(function(err, result) {
      if (err) {
        res.status(500).json({ message: err.message });
      }

      return res.status(200).json({ success: true, message: "Video Published successfully!" });
    });
  },

  /**
   * Fetch All Videos that have been uploaded
   * @param  {void} req
   * @param  {void} res
   * @return {object}
   */
  retrieveAll: function( req, res){
    Video.find({}, function(err, videos) {
      res.status(200).json(videos);
    });
  },
};
