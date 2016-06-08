var jwt        = require('jwt-simple'),
    secrets    = require('./secrets'),
    moment     = require('moment');

/*
 |--------------------------------------------------------------------------
 | Generate JSON Web Token
 |--------------------------------------------------------------------------
 */
function createJWT(user) {
  var payload = {
    sub: user._id,
    iat: moment().unix(),
    exp: moment().add(14, 'days').unix()
  };
  return jwt.encode(payload, secrets.TOKEN_SECRET);
}

/*
 |--------------------------------------------------------------------------
 | Login Required Middleware
 |--------------------------------------------------------------------------
 */
function ensureAuthenticated(req, res, next) {

  if (!req.header('Authorization')) {
    return res.status(401).send({ message: 'Please make sure your request has an Authorization header' });
  }

  var token = req.header('Authorization').split(' ')[1],
      payload = null;

  try {
    payload = jwt.decode(token, secrets.TOKEN_SECRET);
  }
  catch (err) {
    return res.status(401).send({ message: err.message });
  }

  if (payload.exp <= moment().unix()) {
    return res.status(401).json({ message: 'Token has expired' });
  }

  req.user = payload.sub;
  next();
}

module.exports = {
  createJWT: createJWT,
  ensureAuthenticated: ensureAuthenticated
};
