app.factory('Video', ['$http', function($http) {
  return {

    create: function(videoDetails, cb){
      $http.post('/api/videos/create', videoDetails).then( function(response){
        if(response.data.success){
          cb(true, response.data);
        }
        else {
          cb(false, response.data);
        }
      });
    },

    retrieveAll: function(){
      return $http.get('/api/videos');
    }
  };
}]);
