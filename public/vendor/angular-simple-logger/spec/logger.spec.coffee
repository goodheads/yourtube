describe 'nemLogging.nemSimpleLogger', ->
  beforeEach ->
    @createSpyLogger = ->
      @info = ->
      @debug = ->
      @warn = ->
      @error = ->

      spyOn(@, 'info')
      spyOn(@, 'debug')
      spyOn(@, 'warn')
      spyOn(@, 'error')
      @

    $log = @createSpyLogger()
    @log = $log

    angular.module('nemLogging').config ($provide) ->
      #decorate w/ spys
      $provide.decorator '$log', ($delegate) ->
        return $log

    angular.mock.module('nemLogging')
    inject (nemSimpleLogger) =>
      @subject = nemSimpleLogger

  describe 'default', ->
    it 'error', ->
      @subject.error('blah')
      expect(@log.error).toHaveBeenCalled()

    it 'debug', ->
      @subject.debug('blah')
      expect(@log.debug).not.toHaveBeenCalled()

    it 'info', ->
      @subject.info('blah')
      expect(@log.info).not.toHaveBeenCalled()

    it 'warn', ->
      @subject.warn('blah')
      expect(@log.warn).not.toHaveBeenCalled()

  describe 'all on', ->
    beforeEach ->
      inject (nemSimpleLogger) =>
        nemSimpleLogger.currentLevel = nemSimpleLogger.LEVELS.log
        @subject = nemSimpleLogger

    it 'error', ->
      @subject.error('blah')
      expect(@log.error).toHaveBeenCalled()

    it 'debug', ->
      @subject.debug('blah')
      expect(@log.debug).toHaveBeenCalled()

    it 'info', ->
      @subject.info('blah')
      expect(@log.info).toHaveBeenCalled()

    it 'warn', ->
      @subject.warn('blah')
      expect(@log.warn).toHaveBeenCalled()

  describe 'spawn', ->
    beforeEach ->
      @newLogger = @subject.spawn()
      @newLog = @createSpyLogger()

    it 'can create a new logger', ->
      expect(@newLogger.debug).toBeDefined()
      expect(@newLogger != @subject).toBeTruthy()

    describe 'Has Independent', ->
      it 'logLevels', ->
        @newLogger.currentLevel = @newLogger.LEVELS.debug
        expect(@newLogger.currentLevel != @subject.currentLevel).toBeTruthy()
        @newLogger.debug('blah')
        expect(@log.debug).toHaveBeenCalled()
        @newLogger.debug('blah')
        @subject.debug('blah')
        expect(@newLog.debug).toHaveBeenCalled()

  describe 'decorate', ->
    beforeEach ->
      angular.module('nemLogging')
      .config ($provide, nemSimpleLoggerProvider) ->
        #decorate w/ nemSimpleLogger which will call spys internally
        $provide.decorator nemSimpleLoggerProvider.decorator...

      inject ($log) =>
        @subject = $log

    it 'error', ->
      @subject.error('blah')
      expect(@log.error).toHaveBeenCalled()

    it 'debug', ->
      @subject.debug('blah')
      expect(@log.debug).toHaveBeenCalled()

    it 'info', ->
      @subject.info('blah')
      expect(@log.info).toHaveBeenCalled()

    it 'warn', ->
      @subject.warn('blah')
      expect(@log.warn).toHaveBeenCalled()
