'use strict';
var gulp = require('gulp'),
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

gulp.task('watch', ['sass', 'browserSync'], function() {
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
  return gulp.src(['assets/js/jquery-3.1.1.min.js', 'assets/js/bootstrap.min.js', 'assets/js/index.js'])
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
      index: 'show.html'
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

// const gulp = require('gulp'),
//     autoprefixer = require('autoprefixer'),
//     dedupe = require('postcss-discard-duplicates'),
//     postcss = require('gulp-postcss'),
//     scss = require('postcss-scss'),
//     sass = require('gulp-sass'),
//     browserSync = require('browser-sync').create();
// const useref = require('gulp-useref'),
//     uglify = require('gulp-uglify'),
//     gulpIf = require('gulp-if'),
//     cssnano = require('gulp-cssnano'),
//     imagemin = require('gulp-imagemin'),
//     cache = require('gulp-cache'),
//     del = require('del'),
//     runSequence = require('run-sequence'),
//     cssComb = require('gulp-csscomb');

// gulp.task('default', ['watch']);
// gulp.task('build', function(callback) {
//     runSequence('clean:dist', ['sass', 'useref', 'images', 'fonts'],
//         callback
//     );
// });
// gulp.task('watch', ['browserSync', 'prettycss', 'sass'], function() {
//     gulp.watch('sass/style.scss', ['sass']);
//     gulp.watch('templates/*.php', browserSync.reload);
//     gulp.watch('*.html', browserSync.reload);
//     gulp.watch('templates/*.php', browserSync.reload);
//     // gulp.watch('app/js/**/*.js', browserSync.reload);

// });
// gulp.task('prettycss', function() {
//     return gulp.src(['sass/**/*.scss', '!sass/bootstrap/*'], { base: './' })
//         .pipe(postcss([
//             autoprefixer({ browsers: ['last 2 versions'] }),
//             dedupe
//         ], { syntax: scss }))
//         .pipe(cssComb())
//         .pipe(gulp.dest('./'));
// });


// gulp.task('browserSync', function() {
//     browserSync.init({
//         server: {
//             baseDir: './'
//         }
//     });
// });
// gulp.task('clean:dist', function() {
//     return del.sync('dist');
// });
// gulp.task('fonts', function() {
//     return gulp.src('assets/fonts/*')
//         .pipe(gulp.dest('dist/fonts'));
// });
// gulp.task('images', function() {
//     return gulp.src('assets/images/*.+(png|jpg|jpeg|gif|svg)')
//         .pipe(cache(imagemin({
//             interlaced: true
//         })))
//         .pipe(gulp.dest('dist/images'));
// });
// gulp.task('useref', function() {
//     return gulp.src('templates/*.html')
//         .pipe(useref())
//         .pipe(gulpIf('js/**/*.js', uglify()))

//     // Minifies only if it's a CSS file
//     .pipe(gulpIf('css/*.css', cssnano()))
//         .pipe(gulp.dest('dist'));
// });
// gulp.task('sass', function() {
//     return gulp.src('sass/**/*.scss')
//         .pipe(sass()) // Using gulp-sass
//         .pipe(gulp.dest('app/css'))
//         .pipe(browserSync.reload({
//             stream: true
//         }));
// });
