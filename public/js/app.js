var app = angular
            .module('yourtube', [
              'ngCookies',
              'ngRoute',
              'ngStorage',
              'ngMessages',
              'angularMoment',
              'angular-loading-bar',
              'ui.bootstrap',
              'appRoutes',
              'ngSanitize',
              'toastr',
              'ngLodash',
              'hc.marked',
              'angularUtils.directives.dirDisqus',
              'satellizer'])
  .config(['cfpLoadingBarProvider','$authProvider', function(cfpLoadingBarProvider, $authProvider){

    $authProvider.baseUrl = '/';
    $authProvider.loginUrl = '/api/login';
    $authProvider.signupUrl = '/api/register';
    $authProvider.authHeader = 'Authorization';
    $authProvider.authToken = 'Bearer';
    $authProvider.storageType = 'localStorage';

    cfpLoadingBarProvider.includeSpinner   = false;
    cfpLoadingBarProvider.includeBar       = true;

  }]);
