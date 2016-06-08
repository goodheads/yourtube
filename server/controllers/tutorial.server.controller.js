var nodemailer = require('nodemailer'),
    secrets       = require('../../config/secrets'),
    slug          = require('slug'),
    Tutorial      = require('../models/tutorial.server.model');

module.exports = {
  /**
   * Saves A New Tutorial Posted By User
   * @param  {void}   req
   * @param  {void}   res
   * @param  {Function} next
   * @return {object}
   */
  create: function(req, res){
    var tuts            = new Tutorial();
    tuts.title          = req.body.title;
    tuts.slug           = slug(req.body.title.toLowerCase());
    tuts.content        = req.body.content;
    tuts.postedBy       = req.body.postedBy;
    tuts.save(function(err, tuts){
      if(err) {
        if(err.name == 'MongoError' && err.message.indexOf('$title_1') > 0 || err.message.indexOf('$slug_1') > 0) {
          return res.json({ success: false, message: "Tutorial is already registered. Please write another" });
        }
      } else {
        return res.status(200).json({ success: true, message: "Tutorial submitted successfully.Review will take place now" });
      }
    });
  },

  /**
   * Fetch All Tutorials that have been approved
   * @param  {void} req
   * @param  {void} res
   * @return {object}
   */
  getAllTutorials: function( req, res){
    Tutorial.find({ approval_status: true }, function(err, tutorials) {
      res.status(200).json(tutorials);
    });
  },

  /**
   * Fetch the Details of Each Tutorial
   * @param  {void}   req
   * @param  {void}   res
   * @param  {Function} next
   * @return {object}
   */
  getEachTutorialDetails: function(req, res, next){
    var tutorialSlug = req.params.slug;

    Tutorial.find({ slug: tutorialSlug }, function (err, tutorial) {
      if(err) {
        return res.status(404).json({ err: err });
      }

      if(tutorial.length === 0){
        return res.json({ success: false, message: 'Tutorial not found.' });
      }
      else if(tutorial.length == 1) {
        var tutorialDetails = {};
        var tuts = tutorial[0];
        tutorialDetails.id             = tuts._id;
        tutorialDetails.title          = tuts.title;
        tutorialDetails.content        = tuts.content;
        tutorialDetails.postedBy       = tuts.postedBy;
        tutorialDetails.postedOn       = tuts.created_on;

        return res.json({success: true, tutorial: tutorialDetails});
      }
      next();
    });
  },
};