var secrets       = require('../../config/secrets'),
    slug          = require('slug'),
    Video         = require('../models/video.server.model'),
    Upload        = require('./upload.server.controller');

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
      format: req.body.format,
      width: req.body.width,
      height: req.body.height,
      uploaded_by: req.body.uploaded_by
    });

    console.log("Uploaded by", req.body.uploaded_by);

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
  retrieveAll: function( req, res, next){

    if(req.query.uploaded_by === undefined) {
      Video.find({}, function(err, videos) {
        if(err) {
          return res.status(500).json({ message: err.message });
        }
        return res.status(200).json(videos);
      });
    } else {

      // fetch all videos that have been uploaded by the logged in user
      Video.find({ uploaded_by: req.query.uploaded_by }, function(err, videos) {
        if(err) {
          return res.status(500).json({ message: err.message });
        }
        return res.status(200).json({ success: true, videos: videos });
      });
   }
  },

  /**
   * Delete A Video
   * @param  req
   * @param  res
   * @param  next
   * @return Void
   */
  deleteVideo: function(req, res){
    var publicId = req.params.public_id;

    Upload.deleteVideo(req,res);

    Video.remove({public_id: publicId}, function (err, user) {
      if(err) {
        return res.status(404).json({success: false, message: err.message });
      }

      return res.json({success: true, message: 'Video Deleted Successfully'});
    });

  },


  /**
   * Fetch Each Video Details
   * @param   req
   * @param   res
   * @param   next
   * @return  Void
   */
  retrieveEachVideoDetails: function(req, res){
    var publicId = req.params.public_id;

    Video.findOne({ public_id: publicId }, function (err, video) {
      if(err) {
        return res.status(500).json({ message: err.message });
      }

      return res.json({success: true, video: video });
    });
  },

  updateVideoDetails: function(req, res) {
    var publicId = req.params.public_id;
    var videoDetails = req.body;

    Upload.tagVideos(req, res);
    var resizeVideoUrl = Upload.resizeVideo(req, res);
    var trimVideoUrl = Upload.trimVideo(req, res);

    if(req.body.audio) {
      var newVideoUrl = Upload.removeAudio(req, res);
    }

    if(req.body.videoBackground) {
      var coloredVideoUrl = Upload.changeBackground(req, res);
      console.log("Colored Video Url", coloredVideoUrl);
    }

    Video.update({public_id : publicId}, videoDetails, function (err) {
      if(err) {
        return res.status(404).json({success: false, message: 'User Details Not Found', err: err});
      } else {
        return res.status(200).json({
          success: true,
          message: 'Update Successful',
          audioUrl: newVideoUrl,
          colorVideoUrl: coloredVideoUrl,
          resizeVideoUrl: resizeVideoUrl,
          trimVideoUrl: trimVideoUrl
        });
      }
    });
  }
};
