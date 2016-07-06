app.controller('VideoController', ['$scope','$http','$localStorage','$location','$window', 'toastr','Video', function($scope, $http, $localStorage, $location, $window, toastr, Video) {

  $scope.listMyVideos = function() {

    Video.retrieveMyVideos($localStorage.email, function(success, data) {
      if(success) {
       $scope.myVideos = data.videos;
      } else {
       toastr.error( data.message, 'Error', { timeOut: 2000 });
      }
    });
  };

  $scope.deleteVideo = function(public_id) {
    Video.deleteVideo(public_id, function(success, data){
      if(success){
        toastr.success(data.message, { timeOut: 1000 });
        $window.location.assign('/my_videos');
      }
      else{
        toastr.error("Error occurred. Update Failed", 'Error', { timeOut: 2000 });
      }
    }); 
  };

  $scope.listMyVideos();
}]);
