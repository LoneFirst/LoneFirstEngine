var gulp = require('gulp')
var babel = require('gulp-babel')
var concat = require('gulp-concat')
var inject = require('gulp-inject')
var browserify = require('gulp-browserify')

gulp.task('scripts', function() {
    gulp.src(['./src/*.js', './script.js'])
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(concat('lfe.js'))
        .pipe(browserify({
            insertGlobals: true
            ,debug: !gulp.env.production
        }))
        .pipe(gulp.dest('./test'))
})

gulp.task('index', ['scripts'], function() {
    gulp.src('./index.html')
        .pipe(inject(gulp.src('./test/lfe.js', {read:false}), {relative: true}))
        .pipe(gulp.dest('./'))
})

gulp.task('default', ['scripts', 'index'])
