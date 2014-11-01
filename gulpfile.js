/*!
 * module deps
 */

var gulp = require('gulp'),
    connectLivereload = require('connect-livereload'),
    webpack = require('gulp-webpack'),
    webpackConfig = require('./webpack.config'),
    livereload = require('gulp-livereload'),
    connect = require('connect'),
    serveStatic = require('serve-static');

/**
 * build the app
 *
 * @return {Stream}
 */

function build() {
  return gulp
    .src('client.js')
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest('assets'));
}

/*!
 * build task
 */

gulp.task('build', build);

/*!
 * serve task
 */

gulp.task('server', function(next) {
  connect()
    .use(connectLivereload())
    .use(serveStatic('.'))
    .listen(3000, next);
});

/*!
 * serve task
 */

gulp.task('watch', ['build', 'server'], function() {
  livereload.listen();

  // watch src files and build
  gulp.watch('lib/**').on('change', build);

  // watch served files and reload
  gulp.watch(['assets/**', '*.html', '*.css']).on('change', function(file) {
    livereload.changed(file.path);
  });

});