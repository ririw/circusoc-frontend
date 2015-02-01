/*
Minification process for testing:
    * Copy all JS files, preserving structure
    * Copy all CSS files, preserving structure
    * Include the non-minified versions of the include files,
 */

var program = require('commander');
program
    .version("1.0")
    .option('-t, --test', 'use test mode (do not compress & minify')
    .option('-w, --watch', 'watch for changes')
    .parse(process.argv);

var gulp = require('gulp'),
    closureCompiler = require('gulp-closure-compiler'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    preprocess = require('gulp-preprocess'),
    minifyHTML = require('gulp-minify-html'),
    compressor = require('gulp-compressor'),
    inlinesource = require('gulp-inline-source'),
    minified_files = [
        'bower_components/angular-route/angular-route.js',
        'bower_components/angular-aria/angular-aria.js',
        'bower_components/angular-animate/angular-animate.js',
        'index.js',
        'api_service/api_service.js',
        'performer/performer.js',
        'circus-main/circus-main.js',
        'circus-login/circus-login.js',
        'circus-join/circus-join.js',
        'circus-hire/circus-hire.js',
        'circus-contact/circus-contact.js',
        'circus-artists/circus-artists.js',
    ],
    copy_files = [
        'bower_components/angular/angular.min.js',
        'bower_components/hammerjs/hammer.min.js',
        'bower_components/masonry/dist/masonry.pkgd.min.js',
        'bower_components/masonry/dist/masonry.pkgd.min.js',
        'bower_components/angular-material/angular-material.min.js',
    ],
    css_files = [
        "bower_components/angular-material/angular-material.css",
        "performer/performer.css",
        "index.css",
        "circus-artists/circus-artists.css",
        "circus-contact/circus-contact.css",
        "circus-hire/circus-hire.css",
        "circus-join/circus-join.css",
        "circus-login/circus-login.css"
    ],
    html_files = [
        'index.html',
        'circus-artists/circus-artists.html',
        'circus-contact/circus-contact.html',
        'circus-hire/circus-hire.html',
        'circus-join/circus-join.html',
        'circus-login/circus-login.html',
        'circus-main/circus-main.html',
        'performer/performer.html'
    ],
    all_files = minified_files.concat(copy_files).concat(css_files).concat(html_files),
    devmode = program.test,
    config_target = 'local';

var js_compressor = closureCompiler({
    compilerPath: 'bower_components/closure-compiler/compiler.jar',
    fileName: 'code.min.js',
    compilerFlags: {
        // compilation_level: 'ADVANCED_OPTIMIZATIONS'
    }
});


// JS COMPRESSION
if (devmode)
    gulp.task('compress-js', function() {
        return gulp.src(minified_files, {base: "."})
            .pipe(gulp.dest('build/'));
    });
else
    gulp.task('compress-js', function() {
        return gulp.src(minified_files)
            .pipe(js_compressor)
            .pipe(concat('code.min.js'))
            .pipe(gulp.dest('build/'))
    });

config_source = null;
switch (config_target) {
    case 'local':
        config_source = "config/local.js";
        break;
    case 'deployment':
        config_source = "config/deployment.js";
        break;
}

gulp.task('configure', function() {
    return gulp.src(config_source, {base: "."})
        .pipe(rename("config/config.js"))
        .pipe(gulp.dest('build'))
});

if (devmode)
    // In dev-mode, just copy in the files
    gulp.task('concatenate-js', function() {
        return gulp.src(copy_files, {base: "."})
            .pipe(gulp.dest('build/'));
    });
else
    // Otherwise, concatenate with build.min.js
    gulp.task('concatenate-js', ['compress-js'], function () {
        return gulp.src(copy_files.concat(['build/code.min.js']))
            .pipe(concat('all.min.js'))
            .pipe(gulp.dest('build/'))
    });

// Assets
gulp.task('assets', function(){
    return gulp.src('img/*')
        .pipe(gulp.dest('build/img'))
});


// CSS COMPRESSION
if (devmode)
    gulp.task('compress-css', function() {
        return gulp.src(css_files, {base: "."})
            .pipe(gulp.dest('build/'))
    });
else
    gulp.task('compress-css', function() {
        return gulp.src(css_files)
            .pipe(compressor())
            .pipe(concat('all.min.css'))
            .pipe(gulp.dest('build/'))
    });

// HTML INLINING & MINIFICATION
if (devmode)
    gulp.task('inline-html', ['compress-js', 'concatenate-js', 'configure', 'compress-css', 'assets'], function() {
        return gulp.src(html_files, {base: "."})
            .pipe(preprocess({context: {NODE_ENV: 'dev'}}))
            .pipe(gulp.dest('build/'));
    });
else
    gulp.task('inline-html', ['compress-js', 'concatenate-js', 'configure', 'compress-css', 'assets'], function() {
        return gulp.src(html_files, {base: "."})
            .pipe(preprocess({context: {NODE_ENV: 'prod'}}))
            .pipe(inlinesource())
            .pipe(minifyHTML({empty: true}))
            .pipe(gulp.dest('build/'));
    });


gulp.task('watch', function(){
   return gulp.watch(all_files, ['inline-html'], function(){});
});

// gulp.task('default', ['inline-html', 'watch']);
// gulp.task('default', ['compress-js']);
if (program.watch) {
    gulp.task('default', ['inline-html', 'watch']);
} else {
    gulp.task('default', ['inline-html']);
}
