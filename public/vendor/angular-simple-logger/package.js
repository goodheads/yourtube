// package metadata file for Meteor.js
// console.log(global);
// https://atmospherejs.com/nmccready/angular-simple-logger
var packageName = 'nmccready:angular-simple-logger';
var where = 'client'; // where to install: 'client' or 'server'. For both, pass nothing.
var version = Npm.require(process.env.PWD + '/package.json').version;

console.log("angular-simple-logger version to publish: " + version);

Package.describe({
  name: packageName,
  version: version,
  summary: 'angular-simple-logger (official)',
  git: 'git@github.com:nmccready/angular-simple-logger.git',
  documentation: null
});

Package.onUse(function(api) {
  api.versionsFrom(['METEOR@0.9.0', 'METEOR@1.0']);

  api.use([
    'angular:angular@1.2.0',
  ], where);

  api.addFiles('dist/angular-simple-logger.js', where);
});
