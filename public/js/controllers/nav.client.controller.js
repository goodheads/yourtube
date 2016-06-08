app.controller('NavbarCtrl', function($scope, $auth) {
    $scope.isAuthenticated = function() {
      return $auth.isAuthenticated();
    };
});
