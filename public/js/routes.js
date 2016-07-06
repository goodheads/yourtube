var appRoutes = angular.module('appRoutes', []);

appRoutes.config(['$routeProvider', '$locationProvider', '$sceDelegateProvider', function($routeProvider, $locationProvider, $sceDelegateProvider){
  $routeProvider
    .when('/', {
        templateUrl: './views/pages/home.client.view.html'
    })
    .when('/auth/signup', {
        templateUrl: './views/account/create-user.client.view.html',
        controller: 'AuthController',
        resolve: {
          skipIfLoggedIn: skipIfLoggedIn
        }
    })
    .when('/auth/login', {
        templateUrl: './views/account/login.client.view.html',
        controller: 'AuthController',
        resolve: {
          skipIfLoggedIn: skipIfLoggedIn
        }
    })
    .when('/upload', {
        templateUrl: './views/pages/upload.client.view.html',
        controller: 'UploadController',
        resolve: {
         loginRequired: loginRequired
       }
    })
    .when('/my_videos', {
        templateUrl: './views/pages/my_videos.client.view.html',
        resolve: {
         loginRequired: loginRequired
       }
    })
    .when('/my_videos/:id', {
        templateUrl: './views/pages/edit_video.client.view.html',
        resolve: {
         loginRequired: loginRequired
       }
    })
    .when('/logout', {
        template: null,
        controller: 'LogoutCtrl',
        resolve: {
         loginRequired: loginRequired
       }
    })
    .when('/account', {
        templateUrl: './views/account/edit-account.client.view.html',
        controller: 'ProfileController',
        resolve: {
         loginRequired: loginRequired
       }
    })
    .when('/page/about', {
        templateUrl: './views/pages/about.client.view.html'
    })

    .otherwise({ redirectTo: '/' });

    function skipIfLoggedIn($q, $auth) {
       var deferred = $q.defer();
       if ($auth.isAuthenticated()) {
         deferred.reject();
       } else {
         deferred.resolve();
       }
       return deferred.promise;
   }

   function loginRequired($q, $location, $auth) {
       var deferred = $q.defer();
       if ($auth.isAuthenticated()) {
         deferred.resolve();
       } else {
         $location.path('/auth/login');
       }
       return deferred.promise;
   }

    //eliminate the hashbang
    $locationProvider.html5Mode(true);

    //whitelist youtube url to be trusted by AngularJs
    $sceDelegateProvider.resourceUrlWhitelist([
        'self',
        "http://www.youtube.com/embed/**"
    ]);

}]);
