module.exports = {

  db: process.env.MONGODB || process.env.MONGOHQ_URL,

  prerenderToken: process.env.PRERENDERTOKEN,

  TOKEN_SECRET: process.env.TOKEN_SECRET,

  mailChimp: {
    listID: process.env.LISTID,
    apiKey: process.env.MAILCHIMP_KEY
  },

  mailOptions: {
    service: 'Gmail',
    port: 465,
    auth: {
      user: process.env.USER,
      pass: process.env.PASS
    }
  }
};
