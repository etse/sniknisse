var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var clean = require('gulp-clean');
var ts = require('gulp-typescript');
var typescript = require('typescript');
var uglify = require('gulp-uglify');

var src = 'src';
var dest = 'static';

var css = [
    'node_modules/bootstrap/dist/css/bootstrap.min.css',
    'node_modules/bootstrap/dist/css/bootstrap-theme.min.css',
    src + '/**/*.css'
];

var copy = [
    'node_modules/systemjs/dist/system.js',
    'node_modules/systemjs/node_modules/es6-module-loader/dist/es6-module-loader.js'
];

var vendors = [
    'node_modules/angular2/bundles/angular2.dev.js',
    'node_modules/angular2/bundles/router.dev.js',
    'node_modules/angular2/bundles/http.dev.js',
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/bootstrap/dist/js/bootstrap.min.js'
];

gulp.task('clean', function () {
    return gulp.src(dest, {read: false})
        .pipe(clean());
});

gulp.task('typescript', function(){
    var tsProject = ts.createProject('tsconfig.json', {
        typescript: typescript
    });

    return gulp.src(['typings/**/*.ts', src + '/**/*.ts'], { base: src })
        .pipe(sourcemaps.init())
        .pipe(ts(tsProject))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(dest));
});

gulp.task('copy', function() {
    return gulp.src(copy)
        .pipe(gulp.dest(dest + '/vendors'));
});

gulp.task('css', function() {
    return gulp.src(css)
        .pipe(concat('styling.css'))
        .pipe(gulp.dest(dest));
});

gulp.task('vendors', function() {
    return gulp.src(vendors)
        .pipe(concat('vendors.js'))
        .pipe(uglify())
        .pipe(gulp.dest(dest + '/vendors'));
});

gulp.task('templates', function(){
    return gulp.src(src + '/**/*.html')
        .pipe(gulp.dest(dest));
});

gulp.task('build', ['clean'], function(){
    return gulp.start([
        'typescript',
        'vendors',
        'copy',
        'templates',
        'css'
    ]);
});

gulp.task('watch', ["build"], function() {
    gulp.watch(src + '/**/*.ts', ['typescript']);
    gulp.watch(src + '/**/*.html', ['templates']);
    gulp.watch(src + '/**/*.css', ['css'])
});

gulp.task('default', ["clean"], function() {
    gulp.start(["build"]);
});

