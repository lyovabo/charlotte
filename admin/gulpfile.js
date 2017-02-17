'use strict';
var gulp         = require('gulp'),
    url          = require("url"),
    fs           = require("fs"),
    path         = require("path"),
    autoprefixer = require('autoprefixer'),
    dedupe       = require('postcss-discard-duplicates'),
    postcss      = require('gulp-postcss'),
    csscomb      = require('gulp-csscomb'),
    scss         = require('postcss-scss'),
    browserSync  = require('browser-sync').create(),
    sass         = require('gulp-sass'),
    concat       = require('gulp-concat'),
    rename       = require('gulp-rename'),
    uglify       = require('gulp-uglify'),
    imagemin     = require('gulp-imagemin'),
    cache        = require('gulp-cache'),
    connect      = require('connect'),
    app          = connect(),
    header       = require('connect-header');

// The default file if the file/path is not found
var defaultFile = "index.html"

var folder = path.resolve(__dirname, "./");
var jsPath = 'assets/js';
var vPath = 'assets/js/vendor';
gulp.task('watch', ['sass', 'scripts', 'browserSync'], function() {
  gulp.watch('sass/**/*.scss', ['sass']);
  gulp.watch('sass/*.scss', ['sass']);
  gulp.watch('sass/**/*.scss', browserSync.reload);
  gulp.watch('*.html', browserSync.reload);
})

gulp.task('prettycss', function() {
  return gulp.src(['sass/**/*.css', 'sass/**/*.scss', '!sass/bootstrap/**/*.scss'], { base: './' })
    .pipe(postcss([
      autoprefixer({ browsers: ['last 4 versions'] }),
      dedupe
    ], { syntax: scss }))
    .pipe(csscomb())
    .pipe(gulp.dest('./'));
});
gulp.task('scripts', function() {
  return gulp.src([
      vPath + '/jquery/jquery-1.9.1.js',
      vPath + '/bower_components/angular/angular.js',
      vPath + '/bower_components/angular-route/angular-route.js',
      vPath + '/bower_components/angular-ui-router/release/angular-ui-router.js',
      vPath + '/bower_components/angular-cookies/angular-cookies.js',
      vPath + '/bower_components/angular-sanitize/angular-sanitize.js',
      jsPath + '/index.js',
      jsPath + '/components/**/*.js',
      jsPath + '/config.js'
    ])
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest('assets/js/production/'))
    .pipe(rename('scripts.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('assets/js/production/'));
});
gulp.task('sass', function() {
  return gulp.src(['sass/**/*.scss', 'sass/*.scss'])
    .pipe(sass())
    .pipe(gulp.dest('assets/css'))
});

function setContentType(){
    app.use(header({
        'Content-type':'UTF-8'
    }));
}

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: './',
      index: 'index.html',
      middleware: function(req, res, next) {
        setContentType();
        var fileName = url.parse(req.url);
        fileName = fileName.href.split(fileName.search).join("");
        var fileExists = fs.existsSync(folder + fileName);
        if (!fileExists && fileName.indexOf("browser-sync-client") < 0) {
          req.url = "/" + defaultFile;
        }
        return next();
      }
    }
  });
});
gulp.task('images', function() {
  return gulp.src('assets/img/*.+(png|jpg|jpeg|gif|svg)')
    .pipe(cache(imagemin({
      interlaced: true
    })))
    .pipe(gulp.dest('app/images'));
});
gulp.task('templates', function() {
  gulp.src(vPath + '/directives/**/*.js')
    .pipe(embedTemplates())
    .pipe(gulp.dest('./dist'));
});

