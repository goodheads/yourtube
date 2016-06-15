var app = angular
            .module('yourtube', [
              'ngCookies',
              'ngRoute',
              'ngStorage',
              'ngMessages',
              'angularMoment',
              'angular-loading-bar',
              'cloudinary',
              'ui.bootstrap',
              'appRoutes',
              'ngSanitize',
              'ngFileUpload',
              'toastr',
              'ngLodash',
              'hc.marked',
              'angularUtils.directives.dirDisqus',
              'satellizer'])
  .config(['cfpLoadingBarProvider','$authProvider', 'cloudinaryProvider','$httpProvider', function(cfpLoadingBarProvider, $authProvider, cloudinaryProvider, $httpProvider) {

    $authProvider.baseUrl = '/';
    $authProvider.loginUrl = '/api/login';
    $authProvider.signupUrl = '/api/register';
    $authProvider.authHeader = 'Authorization';
    $authProvider.authToken = 'Bearer';
    $authProvider.storageType = 'localStorage';

    cfpLoadingBarProvider.includeSpinner   = false;
    cfpLoadingBarProvider.includeBar       = true;

    cloudinaryProvider.set("cloud_name", "unicodeveloper").set("upload_preset", "b9ej8dr5");

  }]);
