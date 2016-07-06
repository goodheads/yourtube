var User       = require('../models/user.server.model'),
    Video      = require('../models/video.server.model'),
    cloudinary  = require('cloudinary'),
    multiparty  = require('multiparty');

module.exports = {

   /**
     * Upload a video to Yourtube's Cloudinary Server
     * @param  req
     * @param  res
     * @return void
     */
    uploadVideo: function(req, res){
      var fileName = '';
      var form = new multiparty.Form();

      form.on('error', function(err){
        console.log('Error parsing form: ' + err.stack);
      });
      form.on('part', function(part){
        if(!part.filename){
          return;
        }
        size = part.byteCount;
        fileName = part.filename;
      });
      form.on('file', function(name, file){
        cloudinary.uploader.upload(file.path, function(response){
          return res.json({ response: response });
        }, { resource_type: "video" });
      });
      form.on('close', function(){
        console.log('Uploaded!!');
      });
      form.parse(req);
    },

    tagVideos: function(req, res) {
      var tag = req.body.tag;
      var publicId = req.params.public_id;

      cloudinary.uploader.add_tag( tag, [ publicId ], function(response){
        console.log(response);
      }, { resource_type: "video" });
    },

    removeAudio: function(req, res) {
      var videoUrl = req.body.url;
      var publicId = req.params.public_id;
      var format = req.body.format;
      var response = videoUrl.split("upload")[0].concat("upload/ac_none/" + publicId + "." + format );
      return response;
    },

    changeBackground: function(req, res) {
      var videoUrl = req.body.url;
      var publicId = req.params.public_id;
      var format = req.body.format;
      var color = req.body.videoBackground || "yellow";
      var response = videoUrl.split("upload")[0].concat("upload/w_300,h_300,c_pad,b_" + color + "/" + publicId + "." + format );
      return response;
    },

    resizeVideo: function(req, res) {
      var videoUrl = req.body.url;
      var publicId = req.params.public_id;
      var width = req.body.width;
      var height = req.body.height;
      var format = req.body.format;
      var response = videoUrl.split("upload")[0].concat("upload/w_" + width + ",h_" + height + "/" + publicId + "." + format );
      return response;
    },

    trimVideo: function(req, res) {
      var videoUrl = req.body.url;
      var publicId = req.params.public_id;
      var startOffset = req.body.startOffset;
      var duration = req.body.duration;
      var format = req.body.format;
      var response = videoUrl.split("upload")[0].concat("upload/so_" + startOffset + "p,du_" + duration + "p/" + publicId + "." + format );
      return response;
    },

    deleteVideo: function(req, res) {
      var publicId = req.params.public_id;

      cloudinary.uploader.destroy(publicId, function(result) {
          console.log(result);
        }, { resource_type: "video" });
    }
};
