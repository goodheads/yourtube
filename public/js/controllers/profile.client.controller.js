app.controller('ProfileController', ['$scope','$http','toastr','User', function($scope, $http, toastr, User) {

  $scope.getProfile = function() {
      User.getProfile()
        .then(function(response) {
          $scope.user = response.data;
        })
        .catch(function(response) {
          toastr.error(response.data.message);
        });
  };

  $scope.updateProfile = function() {
    User.updateProfile($scope.user)
      .then(function() {
        toastr.success('Profile has been updated!');
      })
      .catch(function(response) {
        toastr.error(response.data.message);
      });
  };

  $scope.getProfile();
}]);
