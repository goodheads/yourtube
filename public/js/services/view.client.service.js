app.factory('View', ['$http', function($http) {
  return {

    increment: function(viewDetails, cb){
      $http.post('/api/view/increment', viewDetails).then( function(response){
        if(response.data.success){
          cb(true, response.data);
        }
        else {
          cb(false, response.data);
        }
      });
    },

    retrieveEachView: function( id, cb ){
      $http.get('/api/view/' + id).then( function(response){
        if(response.data.success){
          cb(true, response.data);
        }
        else{
          cb(false, response.data);
        }
      });
    }
  };
}]);
