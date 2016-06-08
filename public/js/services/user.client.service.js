app.factory('User', ['$http','$q', '$window', function($http, $q, $window) {
  return {

    getProfile: function(){
      return $http.get('/api/me');
    },

    updateProfile: function(profile){
      return $http.put('/api/me', profile);
    }
  };
}]);
