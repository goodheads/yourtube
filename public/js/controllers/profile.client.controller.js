app.controller('ProfileController', ['$rootScope','$scope','$http','$location','$window','$localStorage','$routeParams','toastr','User', function($rootScope,$scope,$http,$location,$window,$localStorage,$routeParams,toastr,User) {

  $scope.getProfile = function() {
      User.getProfile()
        .then(function(response) {
          $scope.user = response.data;
        })
        .catch(function(response) {
          toastr.error(response.data.message, response.status);
        });
  };

  $scope.updateProfile = function() {
    User.updateProfile($scope.user)
      .then(function() {
        toastr.success('Profile has been updated!');
      })
      .catch(function(response) {
        toastr.error(response.data.message, response.status);
      });
  };

  $scope.getProfile();
}]);
