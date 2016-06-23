app.filter("trustUrl", ['$sce', function ($sce) {
        return function (recordingUrl) {
            return $sce.trustAsResourceUrl(recordingUrl);
        };
}]);
