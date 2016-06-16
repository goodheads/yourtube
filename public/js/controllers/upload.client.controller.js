app.controller('UploadController', ['$scope', '$rootScope', '$location', 'Upload','$http',

  /* Uploading with Angular File Upload */
  function($scope, $rootScope, $location, Upload, $http) {

    $scope.uploadFiles = function(files){
      $scope.files = files;
      if (!$scope.files) return;
      angular.forEach(files, function(file){
        if (file && !file.$error) {

          file.upload = Upload.upload({
            url: "/api/upload",
            method: "POST",
            data: {
              file: file
            }
          }).progress(function (e) {
            file.status = "Uploading...";
            file.progress = Math.round((e.loaded * 100.0) / e.total);
          }).success(function (data, status, headers, config) {
            file.status = "Done...100%";
            file.result = data;
          }).error(function (data, status, headers, config) {
            file.result = data;
          });
        }
      });
    };

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
