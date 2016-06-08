var app = angular
            .module('yourtube', [
              'ngCookies',
              'ngRoute',
              'ngStorage',
              'ngMessages',
              'angularMoment',
              'angular-loading-bar',
              'ngFileUpload',
              'ui.bootstrap',
              'appRoutes',
              'ngSanitize',
              'toastr',
              'ngLodash',
              'hc.marked',
              'angularUtils.directives.dirDisqus',
              'satellizer'])
  .config(['cfpLoadingBarProvider','$httpProvider','$authProvider', function(cfpLoadingBarProvider, $httpProvider, $authProvider){

    $authProvider.baseUrl = '/';
    $authProvider.loginUrl = '/api/login';
    $authProvider.signupUrl = '/api/register';
    $authProvider.authHeader = 'Authorization';
    $authProvider.authToken = 'Bearer';
    $authProvider.storageType = 'localStorage';

    // $httpProvider.interceptors.push('authInterceptor');
    cfpLoadingBarProvider.includeSpinner   = false;
    cfpLoadingBarProvider.includeBar       = true;

  }]);
