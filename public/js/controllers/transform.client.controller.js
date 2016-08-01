app.controller('TransformController', ['$scope','$localStorage','$routeParams','Video', 'View', 'toastr', function($scope,$localStorage,$routeParams,Video,View,toastr) {

  Video.retrieveEachVideoDetails($routeParams.id, function(success, data){
    if(success){
      $scope.videoDetails = data.video;

      var viewDetails = {
        public_id : $routeParams.id
      };

      View.increment(viewDetails, function(success, data) {
        if(success) {
          console.log("incremented");
        } else {
          console.log("Something went wrong");
        }
      });

    }
  });

  View.retrieveEachView($routeParams.id, function(success, data){
    if(success){
      $scope.views = data.views;
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
      startOffset: $scope.videoDetails.startOffset,
      duration: $scope.videoDetails.duration,
      videoBackground: $scope.videoDetails.backgroundColor,
      url: $scope.videoDetails.url,
      caption: $scope.videoDetails.caption
    };

    Video.updateVideoDetails($routeParams.id, videoDetails, function(success, data){
      if(success) {
        toastr.success(data.message, { timeOut: 7000 });
        $scope.videoDetails.preview = data.audioUrl;
        $scope.videoDetails.colorPreview = data.colorVideoUrl;
        $scope.videoDetails.resizedVideo = data.resizeVideoUrl;
        $scope.videoDetails.trimmedVideo = data.trimVideoUrl;
        $scope.videoDetails.formattedVideo = data.newFormatVideoUrl;
        $scope.videoDetails.generatedThumbnail =  data.videoThumbnail;
        $scope.videoDetails.captionedVideo =  data.captionedVideoUrl;
      } else {
        toastr.error( data.message, 'Error', { timeOut: 2000 });
      }
    });
  };
}]);
