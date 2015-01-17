var gulp = require('gulp'),
    closureCompiler = require('gulp-closure-compiler'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    minifyHTML = require('gulp-minify-html'),
    compressor = require('gulp-compressor'),
    inlinesource = require('gulp-inline-source'),
    minified_files = [
        'bower_components/angular/angular.min.js',
        'bower_components/angular-route/angular-route.min.js',
        'bower_components/angular-aria/angular-aria.min.js',
        'bower_components/angular-animate/angular-animate.min.js',
        'bower_components/angular-material/angular-material.min.js',
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
    concat_files = [
        'masonry/masonry.pkgd.min.js',
        'bower_components/hammerjs/hammer.min.js',
        'build/intermediate.js'
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
        'index.max.html',
        'circus-artists/circus-artists.html',
        'circus-contact/circus-contact.html',
        'circus-hire/circus-hire.html',
        'circus-join/circus-join.html',
        'circus-login/circus-login.html',
        'circus-main/circus-main.html',
        'performer/performer.html'
    ],
    devmode = false;



var js_compressor = closureCompiler({
        compilerPath: 'bower_components/closure-compiler/compiler.jar',
        fileName: 'intermediate.js',
        compilerFlags: {
            compilation_level: 'ADVANCED_OPTIMIZATIONS'
        }
    });


// JS COMPRESSION
if (devmode)
    gulp.task('compress-js', function() {
        gulp.src(minified_files)
            .pipe(gulp.dest('build/'))
    });
else
    gulp.task('compress-js', function() {
        gulp.src(minified_files)
            .pipe(js_compressor)
            .pipe(gulp.dest('build/'))
    });

// JS MERGE
if (devmode)
    gulp.task('merge-js', ['compress-js'], function() {
        gulp.src(concat_files)
            .pipe(gulp.dest('build/'))
    });
else
    gulp.task('merge-js', ['compress-js'], function() {
        gulp.src(concat_files)
            .pipe(concat('all.min.js'))
            .pipe(gulp.dest('build/'))
    });


// CSS COMPRESSION
if (devmode)
    gulp.task('compress-css', [], function() {
        gulp.src(css_files)
            .pipe(gulp.dest('build/'))
    });
else
    gulp.task('compress-css', function() {
        gulp.src(css_files)
            .pipe(compressor())
            .pipe(gulp.dest('build/'))
    });

// HTML INLINING & MINIFICATION
if (devmode)
    gulp.task('inline-html', ['merge-js', 'compress-css'], function() {
        gulp.src(html_files)
            .pipe(gulp.dest('build/'));
    });
else
    gulp.task('inline-html', ['merge-js', 'compress-css'], function() {
        gulp.src(html_files)
            .pipe(inlinesource())
            .pipe(minifyHTML({empty: true}))
            .pipe(gulp.dest('build/'));
    });
















if (devmode) {
    gulp.task('compress', [], function () {
        gulp.src(minified_files)
            .pipe(concat('intermediate.js'))
            .pipe(gulp.dest('build/'))
    });

    gulp.task('css-minify', [], function() {
        gulp.src(css_files)
            .pipe(gulp.dest('build/'))
    });

    gulp.task('concat', ['compress'], function() {
        gulp.src(concat_files)
            .pipe(concat('all.min.js'))
            .pipe(gulp.dest('build/'))
    });

    gulp.task('inline', ['concat', 'css-minify'], function() {
        gulp.src('index.max.html')
            .pipe(rename('index.html'))
            .pipe(gulp.dest('.'));
    });
} else {
    gulp.task('compress', function () {
        gulp.src(minified_files)
            .pipe(closureCompiler({
                compilerPath: 'bower_components/closure-compiler/compiler.jar',
                fileName: 'intermediate.js',
                compilerFlags: {
                    compilation_level: 'ADVANCED_OPTIMIZATIONS'
                }
            }))
            .pipe(gulp.dest('build/'));
    });


    gulp.task('css-minify', function() {
        gulp.src(css_files)
            .pipe(compressor())
            .pipe(gulp.dest('build/'))
    });

    gulp.task('inline', ['compress', 'concat', 'css-minify'], function() {
        gulp.src('index.max.html')
            .pipe(rename('index.html'))
            .pipe(inlinesource())
            .pipe(minifyHTML({empty: true}))
            .pipe(gulp.dest('.'));
    });
}


gulp.task('concat', ['compress'], function() {
    gulp.src(concat_files)
        .pipe(concat('all.min.js'))
        .pipe(gulp.dest('build/'))
});

gulp.task('watch', function(){
   gulp.watch(minified_files, ['compress']);
   gulp.watch('index.max.html', ['inline']);
   gulp.watch(concat_files, ['concat']);
   gulp.watch(css_files, ['css-minify']);
});

gulp.task('default', ['inline']);
// gulp.task('default', ['inline', 'watch']);