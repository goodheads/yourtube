var User        = require('./controllers/user.server.controller'),
    Contact     = require('./controllers/contact.server.controller'),
    jwt         = require('jwt-simple'),
    secrets     = require('../config/secrets'),
    token       = require('../config/token');

module.exports = function(app) {

  app.get('/api', token.ensureAuthenticated,  User.welcome);

  app.post('/api/login',    User.authenticate);
  app.post('/api/register', User.registerUser);

  app.get('/api/me', token.ensureAuthenticated, User.authenticate);
  app.put('/api/me', token.ensureAuthenticated, User.registerUser);

  // app.get('/api/users',            User.getAllUsers);
  // app.get('/api/user/:user_id',    User.getEachUserDetails);
  // app.get('/api/users/:username',  User.getEachUserByUsername);
  // app.put('/api/user/:user_id',    User.updateEachUserDetails);
  // app.delete('/api/user/:user_id', User.deleteEachUserDetails);
  //
  // app.post('/api/project', Project.shareProject);
  // app.get('/api/project',  Project.getAllProjects);
  // app.get('/api/projects/:projectSlug', Project.getEachProjectDetail);
  // app.delete('/api/project/:id', verifyToken, Project.deleteEachProject);
};
