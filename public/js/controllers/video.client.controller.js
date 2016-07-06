app.controller('VideoController', ['$scope','$http','$localStorage','toastr', 'Video', function($scope, $http, $localStorage, toastr, Video) {

  $scope.listMyVideos = function() {

    Video.retrieveMyVideos($localStorage.email, function(success, data) {
      if(success) {
       $scope.myVideos = data.videos;
      } else {
       toastr.error( data.message, 'Error', { timeOut: 2000 });
      }
    });
  };

  $scope.listMyVideos();
}]);
