app.controller('AuthController', ['$scope','$location','$auth','$localStorage', 'toastr', function($scope, $location, $auth, $localStorage, toastr) {

    $scope.login = function() {
      $auth.login($scope.user)
        .then(function() {
          $localStorage.email = $scope.user.email;
          toastr.success('You have successfully signed in!');
          $location.path('/');
        })
        .catch(function(error) {
          toastr.error(error.data.message);
        });
    };

    $scope.signup = function() {
      $auth.signup($scope.user)
        .then(function(response) {
          $auth.setToken(response);
          $location.path('/');
          toastr.info('You have successfully created a new account and have been signed-in');
        })
        .catch(function(response) {
          console.log(response);
          toastr.error(response.data.message);
        });
    };
  }]);
