app.controller('ContactController', ['$rootScope','$scope','$http','Contact','toastr', function($rootScope, $scope, $http, Contact, toastr) {

  $scope.sendMessage = function(){
    console.log("Just sent the first message");
    var name    = $scope.name;
    var email   = $scope.email;
    var message = $scope.message;
    var emailOptions = {
      name:    name,
      email:   email,
      message: message
    };

    Contact.sendMessage(emailOptions ,function(success, data){
      if(success){
        toastr.success(data.message, { timeOut: 2000 });
      }
      else{
        toastr.error(data.Error, 'Error', { timeOut: 2000 });
      }
    });
  };
}]);