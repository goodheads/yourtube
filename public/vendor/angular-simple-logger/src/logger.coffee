angular.module('nemLogging',[])
.provider 'nemSimpleLogger', ->

  _fns = ['log', 'info', 'debug', 'warn', 'error']

  LEVELS =
    log: 1
    info: 2
    debug: 3
    warn: 4
    error: 5

  maybeExecLevel = (level, current, fn) ->
    fn() if level >= current

  class Logger
    constructor: (@$log) ->
      throw 'internalLogger undefined' unless @$log
      @doLog = true
      logFns = {}
      _fns.forEach (level) =>
        logFns[level] = (msg) =>
          if @doLog
            maybeExecLevel LEVELS[level], @currentLevel, =>
              @$log[level](msg)

      @LEVELS = LEVELS
      @currentLevel = LEVELS.error
      _fns.forEach (fnName) =>
        @[fnName] = logFns[fnName]

    spawn: (newInternalLogger) =>
      new Logger(newInternalLogger or @$log)

  @decorator = ['$log', ($delegate) ->
    #app domain logger enables all logging by default
    log = new Logger($delegate)
    log.currentLevel = LEVELS.log
    log
  ]

  @$get = [ '$log', ($log) ->
    # console.log $log
    #default logging is error for specific domain
    new Logger($log)
  ]
  @
