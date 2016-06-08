 var User       = require('../models/user.server.model'),
    jwt         = require('jsonwebtoken'),
    bluebird    = require('bluebird'),
    Q           = require('q'),
    fs          = bluebird.promisifyAll(require('fs')),
    multiparty  = require('multiparty'),
    path        = require('path'),
    uuid        = require('node-uuid'),
    cloudinary  = require('cloudinary'),
    gravatar    = require('gravatar'),
    nodemailer  = require('nodemailer'),
    _           = require('lodash'),
    secrets     = require('../../config/secrets'),
    token       = require('../../config/token');

module.exports = {
  /**
   * Welcome Notice
   * @param  req
   * @param  res
   * @return Void
   */
  welcome: function(req, res){
    return res.status(200).json({ message: 'Welcome to Yourtube Api'});
  },

  /**
   * Register User with Full Name, Email and password
   * @param  req
   * @param  res
   * @return Void
   */
  registerUser: function(req, res) {

    User.findOne({ email: req.body.email }, '+password', function(err, existingUser) {
      if (existingUser) {
        return res.status(409).json({ message: 'Email is already taken' });
      }

      // Obtain the avatar from gravatar service
      var secureImageUrl  = gravatar.url(req.body.email, {s: '200', r: 'x', d: 'retro'}, true);

      var user = new User({
        fullName: req.body.fullName,
        email: req.body.email,
        password: req.body.password,
        user_avatar: secureImageUrl
      });

      user.save(function(err, result) {
        if (err) {
          res.status(500).json({ message: err.message });
        }
        res.send({ token: token.createJWT(result) });
      });
    });
  },

  /**
   * Fetch Each User Details
   * @param   req
   * @param   res
   * @param   next
   * @return  Void
   */
  getEachUserDetails: function(req, res, next){
    var userId = req.params.user_id;

    User.findOne({_id: userId}, function (err, user) {
      if(err) {
        return res.status(404).json('User Not Found');
      }

      var userDetails = {};

      userDetails._id             = user._id;
      userDetails.email           = user.email;
      userDetails.fullname        = user.fullname;
      userDetails.username        = user.username;
      userDetails.user_avatar     = user.user_avatar;
      userDetails.admin           = user.admin;
      userDetails.bio             = user.bio;
      userDetails.hire_status     = user.hire_status;
      userDetails.address         = user.address;
      userDetails.github_profile  = user.github_profile;
      userDetails.website         = user.website;
      userDetails.twitter_handle  = user.twitter_handle;
      userDetails.registered      = user.registered_on;


      res.json({success: true, user: userDetails});
      next();
    });
  },

  /**
   * Update User Details
   * @param  req
   * @param  res
   * @param  next
   * @return Void
   */
  updateEachUserDetails: function(req, res, next){
    var userId      = req.params.user_id;
    var userDetails = req.body;

    User.update({_id: userId}, userDetails, function (err) {
      if(err) {
        return res.status(404).json({success: false, message: 'User Details Not Found', err: err});
      }

      res.status(200).json({success: true, message: 'Update Successful'});
      next();
    });
  },

  /**
   * Delete A User
   * @param  req
   * @param  res
   * @param  next
   * @return Void
   */
  deleteEachUserDetails: function(req, res, next){
    var userId   = req.params.user_id;

    User.remove({_id: userId}, function (err, user) {
      if(err) {
        return res.status(404).json({success: false, message: 'User Details Not Found'});
      }

      res.json({success: true, message: 'Delete Successful'});
      next();
    });
  },

  /**
   * Authenticate a User via Email and Password
   * @param  req
   * @param  res
   * @return json
   */
  authenticate: function(req, res) {

    User.findOne({ email: req.body.email }, function(err, user) {
      if (!user) {
        return res.status(401).json({ message: 'Invalid Email' });
      }

      user.comparePassword(req.body.password, function(err, isMatch) {
        if (!isMatch) {
          return res.status(401).json({ message: 'Invalid Password' });
        }
        res.send({ token: token.createJWT(user) });
      });
    });
  }
};
