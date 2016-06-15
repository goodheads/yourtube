app.controller('UploadController', ['$scope', '$location', 'Upload', 'cloudinary', '$http',

  /* Uploading with Angular File Upload */
  function($scope, $location, Upload, cloudinary, $http) {

    $scope.uploadFiles = function(files){
      $scope.files = files;
      if (!$scope.files) return;
      angular.forEach(files, function(file){
        if (file && !file.$error) {

          file.upload = Upload.upload({
            url: "http://api.cloudinary.com/v1_1/" + cloudinary.config().cloud_name + "/upload",
            method: "POST",
            skipAuthorization: true,
            data: {
              upload_preset: cloudinary.config().upload_preset,
              tags: 'myvideo',
              file: file
            }
          }).progress(function (e) {
            file.progress = Math.round((e.loaded * 100.0) / e.total);
            file.status = "Uploading... " + file.progress + "%";
          }).success(function (data, status, headers, config) {
            console.log("success", data);
            file.result = data;
          }).error(function (data, status, headers, config) {
            console.log("success", data);
            file.result = data;
          });
        }
      });
    };
    //});

    /* Modify the look and fill of the dropzone when files are being dragged over it */
    $scope.dragOverClass = function($event) {
      var items = $event.dataTransfer.items;
      var hasFile = false;
      if (items !== null) {
        for (var i = 0 ; i < items.length; i++) {
          if (items[i].kind == 'file') {
            hasFile = true;
            break;
          }
        }
      } else {
        hasFile = true;
      }
      return hasFile ? "dragover" : "dragover-err";
    };
  }]);
