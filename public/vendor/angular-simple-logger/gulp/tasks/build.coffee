gulp = require 'gulp'
gulpif = require 'gulp-if'
insert = require 'gulp-insert'
ourPackage = require '../../package.json'
coffeelint = require 'gulp-coffeelint'
coffee = require 'gulp-coffee'
concat = require 'gulp-concat'
{log} = require 'gulp-util'
uglify = require 'gulp-uglify'

coffeeOptions =
  bare: true
date = new Date()

header =
  """
  /**
   *  #{ourPackage.name}
   *
   * @version: #{ourPackage.version}
   * @author: #{ourPackage.author}
   * @date: #{date.toString()}
   * @license: #{ourPackage.license}
   */
  """

gulp.task 'build', ->
  gulp.src('src/*.coffee')
  .pipe gulpif(/[.]coffee$/,coffeelint())
  .pipe gulpif(/[.]coffee$/,coffeelint.reporter())
  .pipe gulpif(/[.]coffee$/,coffee(coffeeOptions).on('error', log))
  .pipe(insert.prepend(header))
  .pipe concat 'index.js'
  .pipe(gulp.dest 'dist' )
  .pipe concat 'angular-simple-logger.js'
  .pipe(gulp.dest 'dist' )
  .pipe uglify()
  .pipe concat 'angular-simple-logger.min.js'
  .pipe(gulp.dest 'dist' )
