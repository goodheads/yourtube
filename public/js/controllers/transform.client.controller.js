app.controller('TransformController', ['$scope','$localStorage','$routeParams','Video', 'toastr', function($scope,$localStorage,$routeParams,Video,toastr) {

  Video.retrieveEachVideoDetails($routeParams.id, function(success, data){
    if(success){
      $scope.videoDetails = data.video;
    }
  });

  $scope.updateVideo = function() {
    var videoDetails = {
      tag: $scope.videoDetails.tag,
      title: $scope.videoDetails.title,
      description: $scope.videoDetails.description,
      audio: $scope.videoDetails.audio,
      format: $scope.videoDetails.format,
      width: $scope.videoDetails.width,
      height: $scope.videoDetails.height,
      videoBackground: $scope.videoDetails.backgroundColor,
      url: $scope.videoDetails.url
    };

    Video.updateVideoDetails($routeParams.id, videoDetails, function(success, data){
      if(success) {
        toastr.success(data.message, { timeOut: 7000 });
        $scope.videoDetails.preview = data.audioUrl;
        $scope.videoDetails.colorPreview = data.colorVideoUrl;
      } else {
        toastr.error( data.message, 'Error', { timeOut: 2000 });
      }
    });
  };
}]);
