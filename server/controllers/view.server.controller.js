var View      = require('../models/view.server.model');

module.exports = {
    increment: function(req, res) {
      var publicId = req.body.public_id;
      var pagecounter;

      // Check if the video already has a counter, else create oner
      View.find({public_id : publicId}, function(err, views) {
        if(err) {
          return res.status(500).json({ message: err.message });
        }

        if(views.length <= 0) {
            var view = new View({
              public_id: req.body.public_id
            });

            view.save(function(err, result) {
              if (err) {
                res.status(500).json({ message: err.message });
              }
              return res.status(200).json({ success: true, message: "Video Published successfully!" });
            });
        } else {

          pageCounter = views[0].counter + 1;
          var viewDetails = {
            counter: pageCounter
          };

          View.update({public_id : publicId}, viewDetails, function (err) {
            if(err) {
              return res.status(500).json({success: false, message: 'Page Views couldnt be updated', err: err});
            } else {
              return res.status(200).json({
                success: true,
                message: 'Update Successful'
              });
            }
          });
        }
      });
    },

    /**
   * Fetch Each Video view
   * @param   req
   * @param   res
   * @param   next
   * @return  Void
   */
    retrieveEachView: function(req, res){
      var publicId = req.params.public_id;

      View.findOne({ public_id: publicId }, function (err, views) {
        if(err) {
          return res.status(500).json({ message: err.message });
        }
        return res.json({success: true, views: views });
      });
    },
};
