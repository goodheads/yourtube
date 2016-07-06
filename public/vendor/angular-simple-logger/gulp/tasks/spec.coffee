gulp = require 'gulp'
Karma = require('karma').Server
open  = require 'gulp-open'
{log} = require 'gulp-util'

karmaConf = require.resolve('../../karma.conf.coffee')

karmaRunner = (done) ->
  log '-- Karma Setup --'
  try
    server = new Karma
      configFile: karmaConf
      singleRun: true, (code) ->
        log "Karma Callback Code: #{code}"
        done(code)
    server.start()
  catch e
    log "KARMA ERROR: #{e}"
    done(e)

gulp.task 'karma', (done) ->
  karmaRunner(done)

gulp.task 'spec', gulp.series 'karma'
