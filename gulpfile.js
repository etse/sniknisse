const gulp = require('gulp');
const del = require('del');
const concat = require('gulp-concat');
const minify = require('gulp-clean-css');
const tsify = require('tsify');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const gulpIf = require('gulp-if');
const uglify = require('gulp-uglify');
const buffer = require('vinyl-buffer');

const src = './src';
const css = src + '/css/*.css';
const dest = './static';
const isProduction = process.env.NODE_ENV === 'production';

gulp.task('clean', function () {
    return del('public/**/*');
});

gulp.task('build.vendors', function() {
    return gulp.src([
            'node_modules/es6-promise/dist/es6-promise.auto.min',
            'node_modules/core-js/client/shim.min.js',
            'node_modules/zone.js/dist/zone.js',
            'node_modules/reflect-metadata/Reflect.js'
        ])
        .pipe(concat('vendors.js'))
        .pipe(gulpIf(isProduction, buffer()))
        .pipe(gulpIf(isProduction, uglify()))
        .pipe(gulp.dest(dest))
});

gulp.task('build.ts', function(){
    return browserify(src + '/bootstrap.ts', {extensions: [".ts",".js"]})
        .plugin('tsify', {target: 'es6', typescript: require('typescript')})
        .transform([
            babelify.configure({extensions: [".ts",".js"], presets: ["es2015"]})
        ])
        .bundle()
        .on('error', function(error){
            console.log("error:", error.message);
            throw error;
        })
        .pipe(source('bundle.js'))
        .pipe(gulpIf(isProduction, buffer()))
        .pipe(gulpIf(isProduction, uglify()))
        .pipe(gulp.dest(dest));

});

gulp.task('build.css', function() {
    return gulp.src(css)
        .pipe(minify())
        .pipe(concat('styling.css'))
        .pipe(gulp.dest(dest));
});

gulp.task('copy.images', function(){
    return gulp.src(src + '/images/**/*')
        .pipe(gulp.dest(dest + '/images'));
});


gulp.task('build.templates', function(){
    return gulp.src(src + '/**/*.html')
        .pipe(gulp.dest(dest));
});

gulp.task('build', ['clean'], function () {
    gulp.start([
        'build.vendors',
        'build.ts',
        'build.css',
        'copy.images',
        'build.templates'
    ]);
});

gulp.task('watch', ["build"], function() {
    gulp.watch(src + '/**/*.ts', ['build.ts']);
    gulp.watch(src + '/**/*.html', ['build.templates']);
    gulp.watch(src + '/**/*.css', ['build.css']);
});

gulp.task('default', ['build']);
