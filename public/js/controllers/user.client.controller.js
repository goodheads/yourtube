app.controller('UserController', ['$rootScope','$scope','$http','$location','$window','$localStorage','$modal','$log','Upload','Auth','User','Project','toastr','leafletData','Geocoder', function($rootScope,$scope,$http,$location,$window,$localStorage,$modal,$log,Upload,Auth,User,Project,toastr,leafletData,Geocoder) {

  var userId =  $rootScope.currentUser._id;

  User.getProfile(userId, function(success, data){
    if(success){
      $scope.userDetails = data.user;
      $rootScope.fullname = data.user.fullname;
      $rootScope.username = data.user.username;
    }
  });

  $scope.editProfile = function() {
  var fullname      = $scope.userDetails.fullname,
    website         = $scope.userDetails.website || '',
    address         = $scope.userDetails.address,
    githubProfile   = $scope.userDetails.github_profile,
    hire_status     = $scope.userDetails.hire_status,
    bio             = $scope.userDetails.bio,
    twitter_handle  = $scope.userDetails.twitter_handle;

    $scope.$watch('files', function() {
      $scope.upload($scope.files, function(data){
        var profile_image = data;
        User.updateUserAvatar(userId, { user_avatar: profile_image }, function(success, data){
          if(success){
            $localStorage.mean_user.user_avatar = profile_image;
            toastr.success(data.message, { timeOut: 1000 });
          }
          else{
            toastr.error("Error occurred. Update Failed", 'Error', { timeOut: 2000 });
          }
        });
      });
    });

    $scope.upload = function(files, cb) {
      if(files && files.length) {
          var file = files[0];
          return Upload.upload({
            url: 'api/file/upload',
            method: 'POST',
            file: file
          })
          .then(function(response){
            if( response.status == 200){
              cb(response.data.dest);
            }else{
              toastr.error("There was an error in uploading the file", 'Error', { timeOut: 2000 });
            }
          });
      }
    };

    var userProfile =  {
      fullname: fullname,
      website:  website,
      address: address,
      bio: bio,
      hire_status:  hire_status,
      github_profile: githubProfile,
      twitter_handle: twitter_handle
    };

    User.updateEachUserDetails(userId, userProfile, function(success, data){
      if(success){
        $localStorage.mean_user.fullname = userProfile.fullname;
        toastr.success(data.message, { timeOut: 1000 });
      }
      else{
        toastr.error("Error occurred. Update Failed", 'Error', { timeOut: 2000 });
      }
    });
  };

  User.getAllUsers().then( function(response){
    $scope.allUsers = response.data;
  });

  Geocoder.geocodeAddress($rootScope.currentUser.address).then( function(response){
    angular.extend($scope, {

      markers: {
        Marker: {
            lat: response.lat,
            lng: response.lng,
            message: "You are here",
            focus: true,
            draggable: false,
        }
      },
      layers: {
        baselayers: {
          osm: {
              name: 'OpenStreetMap',
              url: 'https://{s}.tiles.mapbox.com/v3/examples.map-i875mjb7/{z}/{x}/{y}.png',
              type: 'xyz'
          }
        }
      },
      defaults: {
        scrollWheelZoom: false
      }
    });
  });

  leafletData.getMap().then(function(map) {
    L.GeoIP.centerMapOnPosition(map, 15);
  });


  $scope.animationsEnabled = true;

  $scope.clickToOpen = function (size) {
    var modalScope = $rootScope.$new();
    modalScope.modalInstance = $modal.open({
      animation: $scope.animationsEnabled,
      templateUrl: '../../views/projects/create-project.client.view.html',
      controller: 'ProjectController',
      size: size,
      scope: modalScope
    });

    modalScope.modalInstance.result.then(function (selectedItem) {
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

  $scope.toggleAnimation = function () {
    $scope.animationsEnabled = !$scope.animationsEnabled;
  };
}]);
