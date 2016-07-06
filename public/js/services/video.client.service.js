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
    },

    retrieveMyVideos: function( email, cb ){
      return $http.get('/api/videos/?uploaded_by=' + email).then( function(response){
        if(response.data.success){
          cb(true, response.data);
        }
        else{
          cb(false, response.data);
        }
      });
    },

    retrieveEachVideoDetails: function( id, cb ){
      $http.get('/api/video/' + id).then( function(response){
        if(response.data.success){
          cb(true, response.data);
        }
        else{
          cb(false, response.data);
        }
      });
    },

    updateVideoDetails: function(id, video, cb){
      $http.put('/api/video/' + id, video).then( function(response){
        if(response.data.success){
          cb(true, response.data);
        }
        else{
          cb(false, response.data);
        }
      });
    },
  };
}]);
