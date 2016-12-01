'use strict';
var gulp = require('gulp'),
  url = require("url"),
  fs = require("fs"),
  path = require("path"),
  autoprefixer = require('autoprefixer'),
  dedupe = require('postcss-discard-duplicates'),
  postcss = require('gulp-postcss'),
  csscomb = require('gulp-csscomb'),
  scss = require('postcss-scss'),
  browserSync = require('browser-sync').create(),
  sass = require('gulp-sass'),
  concat = require('gulp-concat'),
  rename = require('gulp-rename'),
  uglify = require('gulp-uglify'),
  imagemin = require('gulp-imagemin'),
  cache = require('gulp-cache');

// The default file if the file/path is not found
var defaultFile = "index.html"

// I had to resolve to the previous folder, because this task lives inside a ./tasks folder
// If that's not your case, just use `__dirname`
var folder = path.resolve(__dirname, "./");

gulp.task('watch', ['sass','scripts', 'browserSync'], function() {
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
  return gulp.src([ 'assets/js/vendor/jquery/jquery-1.9.1.js','assets/js/vendor/jquery/jquery.kwicks.min.js',
                    'assets/js/vendor/jquery/jquery.tiles-gallery.js','assets/js/vendor/jquery/jquery.cloud9carousel.js',
                    'assets/js/vendor/jquery/jquery.lightbox-0.5-mod.js','assets/js/vendor/angular/angular.min.js',
                    'assets/js/vendor/angular/angular-route.min.js','assets/js/vendor/bootstrap.min.js','assets/js/index.js',
                    'assets/js/templates/**/*.js','assets/js/config.js'])
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest('app/js'))
    .pipe(rename('scripts.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('app/js'));
});
gulp.task('sass', function() {
  return gulp.src(['sass/**/*.scss', 'sass/*.scss'])
    .pipe(sass())
    .pipe(gulp.dest('assets/css'))
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: './',
      index: 'index.html',
      middleware: function(req, res, next) {
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
    gulp.src('assets/js/directives/**/*.js')
        .pipe(embedTemplates())
        .pipe(gulp.dest('./dist'));
});