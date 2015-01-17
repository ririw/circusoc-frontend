var gulp = require('gulp'),
    closureCompiler = require('gulp-closure-compiler'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
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
        'bower_components/angular-material/angular-material.min.js',
        'bower_components/masonry/dist/masonry.pkgd.min.js',
        'bower_components/hammerjs/hammer.min.js',
        'bower_components/angular/angular.min.js.map'
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
    all_files = minified_files + copy_files + css_files + html_files,
    devmode = true;

var js_compressor = closureCompiler({
        compilerPath: 'bower_components/closure-compiler/compiler.jar',
        compilerFlags: {
            compilation_level: 'ADVANCED_OPTIMIZATIONS'
        }
    });


// JS COMPRESSION
if (true)
    gulp.task('compress-js', function() {
        gulp.src(minified_files)
            .pipe(gulp.dest('build/'));
        gulp.src(minified_files)
            .pipe(gulp.dest('build/build/')); // These are dev-mode copies
    });
else
    gulp.task('compress-js', function() {
        gulp.src(minified_files)
            .pipe(js_compressor)
            .pipe(gulp.dest('build/'))
    });

gulp.task('copy-js', function() {
    gulp.src(copy_files)
        .pipe(gulp.dest('build/')); // These are dev-mode copies
    gulp.src(copy_files)
        .pipe(gulp.dest('build/build/')); // These are dev-mode copies
});

// Assets
gulp.task('assets', function(){
    gulp.src('img/*')
        .pipe(gulp.dest('build/img'))
});


// CSS COMPRESSION
if (devmode)
    gulp.task('compress-css', [], function() {
        gulp.src(css_files)
            .pipe(gulp.dest('build/build/'))
    });
else
    gulp.task('compress-css', function() {
        gulp.src(css_files)
            .pipe(compressor())
            .pipe(gulp.dest('build/'))
    });

// HTML INLINING & MINIFICATION
if (devmode)
    gulp.task('inline-html', ['copy-js', 'compress-js', 'compress-css', 'assets'], function() {
        gulp.src(html_files)
            .pipe(gulp.dest('build/'));
    });
else
    gulp.task('inline-html', ['copy-js', 'compress-js', 'compress-css', 'assets'], function() {
        gulp.src(html_files)
            .pipe(inlinesource())
            .pipe(minifyHTML({empty: true}))
            .pipe(gulp.dest('build/'));
    });


gulp.task('watch', function(){
   gulp.watch(all_files, ['inline-html']);
});

gulp.task('default', ['inline-html']);
// gulp.task('default', ['compress-js']);
// gulp.task('default', ['inline', 'watch']);