var nodemailer    = require('nodemailer'),
    MCapi         = require('mailchimp-api'),
    smtpTransport = require('nodemailer-smtp-transport'),
    secrets       = require('../../config/secrets');
    MC            = new MCapi.Mailchimp(secrets.mailChimp.apiKey);

module.exports = {
  /**
   *  Subscribe A User to Meanmap Newsletter
   * @param  {void}   req
   * @param  {void}   res
   * @param  {Function} next
   * @return {object}
   */
  subscribe: function(req, res, next){
    var email  = req.body.email;
    var listID = secrets.mailChimp.listID;
    var mcReq  = {
      id: listID,
      email: {
        email: email
      },
    merge_vars: {
        EMAIL: email
      }
    };
    // submit subscription request to mail-chimp
    MC.lists.subscribe(mcReq, function(data) {
      res.json({ success:true, message: data });
      next();
    }, function(error) {
        res.json({ success:false, error: error });
    });
  }
};