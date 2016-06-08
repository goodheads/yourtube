var nodemailer = require('nodemailer'),
    secrets       = require('../../config/secrets'),
    Job           = require('../models/job.server.model');

module.exports = {
  /**
   * Saves a new Job Posted By A Company/User
   * @param  {void}   req
   * @param  {void}   res
   * @param  {Function} next
   * @return {object}
   */
  create: function(req, res, next){
    var jobs            = new Job();
    jobs.title          = req.body.title;
    jobs.description    = req.body.description;
    jobs.company        = req.body.company;
    jobs.save( function(err, jobs){
      if(err) {
        next(err);
      } else {
        return res.status(200).json({ success: true, message: "Job submitted successfully.Review will take place within 24hrs" });
      }
    });
  },
  /**
   * Fetch All Jobs that have been approved by the Admin
   * @param  {void} req
   * @param  {void} res
   * @return {object}
   */
  getAllJobs: function(req, res){
    Job.find({ approval_status: true }, function(err, jobs) {
      return res.status(200).json(jobs);
    });
  }
};