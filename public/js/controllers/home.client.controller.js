app.controller('HomeController', ['$scope','$http','toastr','User', 'Video', function($scope, $http, toastr, User, Video) {

  $scope.listVideos =  function(){
    Video.retrieveAll().then(function(response){
       $scope.allVideos = response.data;
       console.log(response.data);
    });
  };

  $scope.listVideos();
}]);
