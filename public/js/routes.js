var appRoutes = angular.module('appRoutes', []);

appRoutes.config(['$routeProvider', '$locationProvider', '$sceDelegateProvider',function($routeProvider, $locationProvider, $sceDelegateProvider){
  $routeProvider
    .when('/', {
        templateUrl: './views/pages/home.client.view.html'
    })
    .when('/admin01234-meanmap/tutorials', {
        templateUrl: './views/admin/create-user.client.view.html',
        controller: 'AuthController'
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
    .when('/auth/new_password', {
        templateUrl: './views/account/reset-password.client.view.html'
    })
    .when('/logout', {
        template: null,
        controller: 'LogoutCtrl',
        resolve: {
         loginRequired: loginRequired
       }
    })
    .when('/jobs', {
        templateUrl: './views/jobs/jobs.client.view.html'
    })
    .when('/mean-developers', {
        templateUrl: './views/pages/developers.client.view.html'
    })
    .when('/page/contact', {
        templateUrl: './views/pages/contact.client.view.html'
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
    .when('/post-a-job', {
        templateUrl: './views/jobs/post-job.client.view.html',
        controller: 'JobsController'
    })
    .when('/tutorials', {
        templateUrl: './views/tutorials/tutorial-list.client.view.html'
    })
    .when('/tutorials/:slug', {
        templateUrl: './views/tutorials/tutorial-detail.client.view.html'
    })
    .when('/tutorial/create', {
        templateUrl: './views/tutorials/tutorial-create.client.view.html',
        controller: 'TutsController'
    })
    .when('/reset-password', {
        templateUrl: './views/account/reset-password.view.html'
    })
    .when('/projects', {
        templateUrl: './views/projects/projects.client.view.html'
    })
    .when('/projects/featured/:projectSlug', {
        templateUrl: './views/projects/project-detail.client.view.html'
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
