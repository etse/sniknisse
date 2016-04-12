const gulp = require('gulp');
const del = require('del');
const concat = require('gulp-concat');
const minify = require('gulp-minify-css');
const tsify = require('tsify');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');

const src = './src';
const css = src + '/css/*.css';
const dest = './static';

gulp.task('clean', function () {
    return del('public/**/*');
});

gulp.task('build.vendors', function() {
    return gulp.src([
            'node_modules/angular2/bundles/angular2-polyfills.js',
            'node_modules/reflect-metadata/Reflect.js'
        ])
        .pipe(concat('vendors.js'))
        .pipe(gulp.dest(dest))
});

gulp.task('build.ts', function(){
    return browserify(src + '/bootstrap.ts', {extensions: [".ts",".js"]})
        .plugin('tsify', {target: 'es6', typescript: require('typescript')})
        .transform(babelify, {extensions: [".ts",".js"], presets: ["es2015"]})
        .bundle()
        .on('error', function(error){
            console.log("error:", error.message);
            throw error;
        })
        .pipe(source('bundle.js'))
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
});

gulp.task('default', ['build']);
