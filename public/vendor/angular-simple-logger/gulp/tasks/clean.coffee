gulp = require 'gulp'
del = require 'del'

gulp.task 'clean', (done) ->
  del ['dist', '*.log'], done
