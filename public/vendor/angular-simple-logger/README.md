angular-simple-logger (nemLogging.nemSimpleLogger)
==============
[![Dependencies](https://david-dm.org/nmccready/angular-simple-logger.png)](https://david-dm.org/nmccready/angular-simple-logger)&nbsp;
[![Dependencies](https://david-dm.org/nmccready/angular-simple-logger.png)](https://david-dm.org/nmccready/angular-simple-logger)&nbsp;
[![Build Status](https://travis-ci.org/nmccready/angular-simple-logger.png?branch=master)](https://travis-ci.org/nmccready/angular-simple-logger)


### Purpose:
To have simplified log levels where a supporting angular module's log levels are independent of the application.


### Basic use:

```js
angular.module('someApp', ['nemLogging'])
//note this can be any type of injectable angular dependency (factory, service.. etc)
.controller("someController", function ($scope, nemSimpleLogger) {
  nemSimpleLogger.doLog = true; //default is true
  nemSimpleLogger.currentLevel = nemSimpleLogger.LEVELS.debug;//defaults to error only
});  
```

### Create a Custom Independent Loggers
*(maybe 3 for one lib)*

```js
angular.module('someApp', ['nemLogging'])
//note this can be any type of injectable angular dependency (factory, service.. etc)
.service("apiLogger", function ($scope, nemSimpleLogger) {
  var logger = nemSimpleLogger.spawn();
  logger.currentLevel = logger.LEVELS.warn;
  return logger;
})
.service("businessLogicLogger", function ($scope, nemSimpleLogger) {
  var logger = nemSimpleLogger.spawn();
  logger.currentLevel = logger.LEVELS.error;
  return logger;
})
.service("terseLogger", function ($scope, nemSimpleLogger) {
  var logger = nemSimpleLogger.spawn();
  logger.currentLevel = logger.LEVELS.info;
  return logger;
});
```

### Use your new creations!

```js
angular.module('someApp', ['nemLogging'])
//note this can be any type of injectable angular dependency (factory, service.. etc)
.service("booksApi", function (apiLogger, $http) {
  //do something with your books
  $http.get("/ap/books").then(function(data){
    apiLogger.debug("books have come yay!");
  });
})
.controller("businessCtrl", function ($scope, businessLogicLogger, book) {
  businessLogicLogger.debug("new book");
  var b = new book();
  $scope.books = [b];
})
.controller("appCtrl", function ($rootScope, terseLogger) {
  $rootScope.$on "error", function(){
    terseLogger.error("something happened");
  }
});
```

### Override all of $log (optional decorator)

Optionally (default is off) decorate $log to utilize log levels globally within the app.

Note this logger's currentLevel is info!

```js
angular.module('someApp', ['nemLogging']))
.config(function($provide, nemSimpleLoggerProvider) {
  return $provide.decorator.apply(null, nemSimpleLoggerProvider.decorator);
})
.config(function($provide, nemSimpleLoggerProvider) {
  var logger = $provide.decorator.apply(null, nemSimpleLoggerProvider.decorator);
  //override level at config
  logger.currentLevel = logger.LEVELS.error;
  return logger;
})
.run(function($log){
  //at run time
  //override the default log level globally
  $log.currentLevel = $log.LEVELS.error;
});
```

### API
Underneath it all it is still calling `$log` so calling the logger for logging itself is the same.

- LEVELS: available are `log, info, debug, warn, error`

- doLog (boolean) - deaults to true. If set to false all logging for that logger instance is disabled.

- currentLevel (number) - defaults to `error: 5` corresponds to the current log level provided by `LEVELS`.
