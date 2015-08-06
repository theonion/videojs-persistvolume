var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var ghelp = require('gulp-showhelp');

gulp.task('browserify', function() {
  return browserify('./videojs.persistvolume.js')
    .exclude('videojs')
    .bundle()
    .on('error', gutil.log.bind(gutil, "Browserify error: "))
    .pipe(source('videojs.persistvolume.js'))
    .pipe(gulp.dest('dist/'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dist/'));
}).help = "Performs browserify bundling";

gulp.task('default', function() {
  ghelp.show();
}).help = "Show this help";
