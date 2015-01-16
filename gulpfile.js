var gulp = require('gulp'),
    closureCompiler = require('gulp-closure-compiler'),
    concat = require('gulp-concat'),
    compressor = require('gulp-compressor'),
    minified_files = [
        'bower_components/angular/angular.min.js',
        'bower_components/angular-route/angular-route.min.js',
        'bower_components/angular-aria/angular-aria.min.js',
        'bower_components/angular-animate/angular-animate.min.js',
        'bower_components/angular-material/angular-material.min.js',
        'index.js',
        'performer/performer.js',
        'circus-main/circus-main.js',
        'circus-login/circus-login.js',
        'circus-join/circus-join.js',
        'circus-hire/circus-hire.js',
        'circus-contact/circus-contact.js',
        'circus-artists/circus-artists.js'
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
    quick = false;

if (quick) {
    gulp.task('compress', function () {
        gulp.src(minified_files)
            .pipe(concat('intermediate.js'))
            .pipe(gulp.dest('build/'))
    });
    gulp.task('css-minify', function() {
        gulp.src(css_files)
            .pipe(concat('all.min.css'))
            .pipe(gulp.dest('build/'))
    });
} else {
    gulp.task('compress', function () {
        gulp.src(minified_files)
            .pipe(closureCompiler({
                compilerPath: 'bower_components/closure-compiler/compiler.jar',
                fileName: 'intermediate.js'
            }))
            .pipe(gulp.dest('build/'));
    });

    gulp.task('css-minify', function() {
        gulp.src(css_files)
            .pipe(concat('all.min.css'))
            .pipe(compressor())
            .pipe(gulp.dest('build/'))
    });
}


gulp.task('concat', ['compress'], function() {
    gulp.src(concat_files)
        .pipe(concat('all.min.js'))
        .pipe(gulp.dest('build/'))
});

gulp.task('watch', function(){
   gulp.watch(minified_files, ['compress']);
   gulp.watch(concat_files, ['concat']);
   gulp.watch(css_files, ['css-minify']);
});

//gulp.task('default', ['concat', 'compress', 'css-minify']);
gulp.task('default', ['watch']);