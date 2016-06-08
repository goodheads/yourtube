app.factory('User', ['$http', function($http) {
  return {

    getProfile: function(){
      return $http.get('/api/me');
    },

    updateProfile: function(profile){
      return $http.put('/api/me', profile);
    }
  };
}]);
