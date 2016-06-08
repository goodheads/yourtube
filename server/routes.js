var User        = require('./controllers/user.server.controller'),
    token       = require('../config/token');

module.exports = function(app) {
  app.get('/api', token.ensureAuthenticated,  User.welcome);

  app.post('/api/login',    User.authenticate);
  app.post('/api/register', User.registerUser);

  app.get('/api/me', token.ensureAuthenticated, User.getLoggedInUserDetail);
  app.put('/api/me', token.ensureAuthenticated, User.updateLoggedInUserDetail);
};
