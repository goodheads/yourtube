app.controller('UploadController', ['$scope', '$rootScope', '$location', 'toastr', 'Upload', 'Video', '$http',

  /* Uploading with Angular File Upload */
  function($scope, $rootScope, $location, toastr, Upload, Video, $http) {

    $scope.uploadFiles = function(files){
      $scope.files = files;
      if (!$scope.files) return;
      angular.forEach(files, function(file){
        if (file && !file.$error) {

          file.upload = Upload.upload({
            url: "/api/upload",
            method: "POST",
            data: {
              file: file,
            }
          }).progress(function (e) {
            file.status = "Uploading...Processing...";
            file.progress = Math.round((e.loaded * 100.0) / e.total);

          }).success(function (data, status, headers, config) {
            file.status = "Done...100%. Draft Saved! Now, Hit the Publish Button to go live when you are ready";
            file.result = data;
            console.log(data.response);
            var details = {
              title: $scope.video.title,
              public_id: data.response.public_id,
              description: $scope.video.description,
              url: data.response.secure_url,
              duration: data.response.duration,
              format: data.response.format
            };

            Video.create(details, function(success, data){
              if(success){
                toastr.success(data.message, { timeOut: 3000 });
              }else{
                toastr.error(data.message, 'Error', { timeOut: 2000 });
              }
            });

            file.status = "Your Video is live now!";

            console.log(data);
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
