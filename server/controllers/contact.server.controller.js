var nodemailer = require('nodemailer'),
    smtpTransport = require('nodemailer-smtp-transport'),
    secrets       = require('../../config/secrets');

module.exports = {
  /**
   * Send An Email To The Admin About Enquiries Made By Users
   * @param  {void}   req
   * @param  {void}   res
   * @param  {Function} next
   * @return {object}
   */
  sendMessage: function(req, res, next){
    var transporter = nodemailer.createTransport(secrets.mailOptions);
    var fullname    = req.body.name.toLowerCase();
    var senderEmail = req.body.email.toLowerCase();
    var emailTo     = 'prosperotemuyiwa@gmail.com';
    var subject     = 'Enquiry From meanmap.com by ' + senderEmail;
    var text        = req.body.message;

    var mailOptions = {
      from:    senderEmail,
      to:      emailTo,
      subject: subject,
      text:    text
    };

    // Send the email
    transporter.sendMail(mailOptions, function(err, info){
      if(err){
        res.status(500).send({
          "message": "Message sending failed",
          "error": err
        });
      }
      else{
        res.json({ success: true, message: "Message sent successfully", response: info });
      }
    });

    // Free Up Resources After Execution
    transporter.close();
  }
};