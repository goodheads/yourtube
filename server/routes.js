var User        = require('./controllers/user.server.controller'),
    Upload      = require('./controllers/upload.server.controller'),
    Video       = require('./controllers/video.server.controller'),
    View        = require('./controllers/view.server.controller'),
    token       = require('../config/token');

module.exports = function(app) {
  app.get('/api', token.ensureAuthenticated,  User.welcome);

  app.post('/api/login',    User.authenticate);
  app.post('/api/register', User.registerUser);

  app.post('/api/upload', token.ensureAuthenticated, Upload.uploadVideo);
  app.post('/api/view/increment', View.increment);
  app.get('/api/view/:public_id', View.retrieveEachView);

  app.post('/api/videos/create', token.ensureAuthenticated, Video.create);
  app.put('/api/video/:public_id', token.ensureAuthenticated, Video.updateVideoDetails);
  app.get('/api/videos', Video.retrieveAll);
  app.get('/api/video/:public_id', token.ensureAuthenticated, Video.retrieveEachVideoDetails);
  app.delete('/api/video/:public_id', token.ensureAuthenticated, Video.deleteVideo);

  app.get('/api/me', token.ensureAuthenticated, User.getLoggedInUserDetail);
  app.put('/api/me', token.ensureAuthenticated, User.updateLoggedInUserDetail);
};
