/**
* Gulp File For Compiling CSS and JS
*
* Required Packages
*
* @var OBJECT gulp
* @var OBJECT gulp-util
* @var OBJECT gulp-plumber
* @var OBJECT gulp-sass
* @var OBJECT gulp-postcss
* @var OBJECT autoprefixed
* @var OBJECT cssnano
* @var OBJECT gulp-concat
* @var OBJECT ulgify
*/
var gulp = require('gulp');
var gutil = require('gulp-util');
var plumber = require('gulp-plumber'),
    plumberOptions = {
    errorHandler: function (err) {
        console.log(err.name+': '+err.message);
        gutil.beep();
        this.emit('end');
      }
    };

/**
* Packages For CSS
*/
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');

/**
* Packages For JS
*/
var concat = require('gulp-concat');

/**
* @var ARRAY [OBJECT autoprefixer({ options }), OBJECT cssnano({ options })]
*/
var processors = [
  autoprefixer({browser: ['last 10 versions']}),
  cssnano({
    discardComments: {removeAll: true}
  })
];

/**
* Compile CSS Files
*
* @return FILE complied file
*/
gulp.task('maincss', function(){

  return gulp.src(['public/css/sass/base.sass', 'public/css/sass/main.sass'])
          .pipe(plumber(plumberOptions))
          .pipe(sass())
          .pipe(postcss(processors))
          .pipe(gulp.dest('public/css/'));

});

/**
* Compile JS Files
*
* @return FILE complied file
*/
gulp.task('scripts', function() {

  return gulp.src('public/js/functions/_*.js')
      .pipe(plumber(plumberOptions))
      .pipe(concat({ path: 'main.js', stat: { mode: 0666 }}))
      .pipe(gulp.dest('public/js/'));

});

/**
* Watch File For Changes
*
* @return NULL null
*/
gulp.task('default', function() {

  /**
  * Watch CSS Files
  */
  gulp.watch('public/css/sass/**/*.s**', ['maincss']);

  /**
  * Watch JS Files
  */
  gulp.watch('public/js/**/*.js', ['scripts']);

});
