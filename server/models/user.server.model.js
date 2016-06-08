var mongoose          = require('mongoose'),
    bcrypt            = require('bcrypt'),
    userSchema        =  mongoose.Schema({
    fullName:      { type: String },
    email:         { type: String, required: true, unique: true, lowercase: true },
    password:      { type: String, required: true },
    user_avatar:   { type: String, default: 'http://s3.amazonaws.com/37assets/svn/765-default-avatar.png' },
    registered_on: { type: Date, default: Date.now }
});

userSchema.pre('save', function(next) {
  var user = this;

  if (!user.isModified('password')) {
    return next();
  }

  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(user.password, salt, function(err, hash) {
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(password, done) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    done(err, isMatch);
  });
};

module.exports = mongoose.model('User', userSchema, 'users');
