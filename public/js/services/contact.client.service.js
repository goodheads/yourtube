app.factory('Contact', ['$http', function($http) {
  return {
    sendMessage: function(emailOptions, cb){
      $http.post('/api/contact', emailOptions).then( function(response){
        if(response.data.success){
          cb(true, response.data);
        }
        else {
          cb(false, response.data);
        }
      });
    }
  };
}]);