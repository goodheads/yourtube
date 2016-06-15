var User       = require('../models/user.server.model'),
   cloudinary  = require('cloudinary'),
   gravatar    = require('gravatar'),
   multiparty  = require('multiparty'),
   secrets     = require('../../config/secrets'),
   token       = require('../../config/token');

module.exports = {

  /**
     * Upload a video to Yourtube's Cloudinary Server
     * @param  req
     * @param  res
     * @return void
     */
    uploadVideo: function(req, res){
      var fileName = '';
      var size = '';
      var tempPath;
      var extension;
      var videoName;
      var destPath = '';
      var inputStream;
      var outputStream;
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
    }
};
