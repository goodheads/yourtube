var nodemailer = require('nodemailer'),
    smtpTransport = require('nodemailer-smtp-transport'),
    secrets       = require('../../config/secrets'),
    slug          = require('slug'),
    webshot       = require('webshot'),
    cloudinary    = require('cloudinary'),
    async         = require('async'),
    Project       = require('../models/project.server.model');

module.exports = {
  /**
   * Saves a Project Shared By A User
   * @param  {void} req
   * @param  {void} res
   * @return {object}
   */
  shareProject: function(req, res){
    async.waterfall([
      function(cb) {
        var projectUrl = req.body.url;
        var url = cloudinary.url( projectUrl,
          { type: "url2png", secure: true, crop: "fill", width: 300, height: 200, gravity: "north", sign_url: true });
        console.log("url ", url);
        cb(null, url);
      },
    ], function (err, result) {
        var project = new Project();
        project.name = req.body.name;
        project.description = req.body.description;
        project.url = req.body.url;
        project.slug = slug(req.body.name);
        project.postedBy = req.body.postedBy;
        project.snapshot = result;
        project.save( function( err, projects){
          if(err) {
            console.log( err );
            if(err.name == 'MongoError' && err.message.indexOf('$name_1') > 0 || err.message.indexOf('$url_1') > 0 ) {
              return res.json({ success: false, message: 'Project is registered already. Please choose another' });
            }
          } else {
            return res.status(200).json({ success: true, message: "Project Shared successfully." });
          }
        });
    });
  },

  /**
   * Fetch All Projects Submitted By Users
   * @param  {void}   req
   * @param  {void}   res
   * @param  {void}   next
   * @return {object}
   */
  getAllProjects: function( req, res, next){
    Project.find({}, function(err, projects) {
      return res.status(200).json(projects);
    });
  },

  /**
   * Fetch the Details of Each Project
   * @param  {void}   req
   * @param  {void}   res
   * @param  {Function} next
   * @return {object}
   */
  getEachProjectDetail: function(req, res, next){
    var projectSlug = req.params.projectSlug;

    Project.find({ slug: projectSlug }, function (err, project) {
      if(err) {
        return res.status(404).json({ err: err });
      }

      if(project.length === 0){
        return res.json({ success: false, message: 'Project not found.' });
      }
      else if(project.length == 1) {
        var projectDetails = {};
        var projects = project[0];
        projectDetails.id             = projects._id;
        projectDetails.name           = projects.name;
        projectDetails.slug           = projects.slug;
        projectDetails.description    = projects.description;
        projectDetails.url            = projects.url;
        projectDetails.postedBy       = projects.postedBy;
        projectDetails.postedOn       = projects.registered_on;

        return res.json({success: true, project: projectDetails});
      }
      next();
    });
  },

  /**
   * Delete A Project
   * @param  {void}   req
   * @param  {void}   res
   * @param  {Function} next
   * @return {object}
   */
  deleteEachProject: function(req, res, next){
    var projectId   = req.params.id;

    Project.remove({_id: projectId}, function (err, project) {
      if(err) {
        return res.status(404).json({success: false, message: 'Project Details Not Found'});
      }

      res.json({success: true, message: 'Delete Successful'});
      next();
    });
  },

};