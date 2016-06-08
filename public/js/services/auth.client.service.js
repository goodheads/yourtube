app.factory('Auth', ['$http','$q', '$window', '$localStorage', function($http, $q, $window, $localStorage) {
  return {

    isLoggedIn: function(){
      return ($localStorage.mean_token)? true : false;
    },

    loginUser: function(credentials, cb) {
      $http.post('/api/login', credentials).then(function(response ){
        if(response.data.success){
          cb(true, response.data);
        }
        else {
          cb(false, response.data);
        }
      });
    },

    registerUser: function(user, cb){
      $http.post('/api/register', user).then( function(response){
        if( response.data.success){
          cb(true, response.data);
        }
        else{
          cb(false, response.data);
        }
      });
    },

    logOutUser: function(){
      delete $localStorage.mean_user;
      delete $localStorage.mean_token;
    },

    resetPassword: function(email,cb){
      $http.post('/api/password', email).then(function(response){
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