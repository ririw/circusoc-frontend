var compressor = require('node-minify');

// Using Google Closure
new compressor.minify({
    type: 'gcc',
    //type: 'no-compress',
    fileIn: [
        'bower_components/angular/angular.min.js',
        'bower_components/angular-route/angular-route.min.js',
        'bower_components/angular-aria/angular-aria.min.js',
        'bower_components/angular-animate/angular-animate.min.js',
        'bower_components/hammerjs/hammer.min.js',
        'bower_components/angular-material/angular-material.min.js',
        'masonry/masonry.pkgd.min.js',
        'index.js',
        'performer/performer.js',
        'circus-main/circus-main.js',
        'circus-login/circus-login.js',
        'circus-join/circus-join.js',
        'circus-hire/circus-hire.js',
        'circus-contact/circus-contact.js',
        'circus-artists/circus-artists.js'
    ],
    fileOut: 'all.min.js',
    callback: function(err, min){
        if (err) {
            console.error(err)
        } else {
            console.log("Successfully minifed all circus js");
        }
    }
});

function with_minified_libs(){
    new compressor.minify({
        // type: 'no-compress',
        type: 'gcc',
        fileIn: [
            'bower_components/angular/angular.min.js',
            'bower_components/angular-route/angular-route.min.js',
            'bower_components/angular-aria/angular-aria.min.js',
            'bower_components/angular-animate/angular-animate.min.js',
            'bower_components/hammerjs/hammer.min.js',
            'bower_components/angular-material/angular-material.min.js',
            'masonry/masonry.pkgd.min.js',
            'circ.min.js'
        ],
        fileOut: 'all.min.js',
        callback: function(err, min){
            if (err) console.error(err);
            else console.log("Successfully minifed all js");
        }
    })}

// Using YUI Compressor for CSS
new compressor.minify({
    type: 'yui-css',
    //type: 'no-compress',
    fileIn: [
        "bower_components/angular-material/angular-material.css",
        "performer/performer.css",
        "index.css",
        "circus-artists/circus-artists.css",
        "circus-contact/circus-contact.css",
        "circus-hire/circus-hire.css",
        "circus-join/circus-join.css",
        "circus-login/circus-login.css"
    ],
    fileOut: 'all.min.css',
    callback: function(err, min){
        if (err) console.error(err);
        else console.log('Successfully minifed css')
    }
});