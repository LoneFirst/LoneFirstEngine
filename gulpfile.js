var gulp = require('gulp')
var babel = require('gulp-babel')
var concat = require('gulp-concat')
var inject = require('gulp-inject')
var browserify = require('gulp-browserify')

gulp.task('package', function() {
    gulp.src(['./src/**/*.js'])
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(concat('lfe.js'))
        // .pipe(browserify({
        //     insertGlobals: true
        //     ,debug: !gulp.env.production
        // }))
        .pipe(gulp.dest('./test'))
})

gulp.task('index', ['scripts'], function() {
    gulp.src('./index.html')
        .pipe(inject(gulp.src(['./test/lfe.js', './script.js'], {read: false}), {relative: true}))
        .pipe(gulp.dest('./'))
})

gulp.task('test', function() {
    gulp.src('./test.html')
        .pipe(inject(gulp.src(['./src/**/*.js', './script.js'], {read: false}), {relative: true}))
        .pipe(gulp.dest('./'))
})

gulp.task('default', ['test'])
