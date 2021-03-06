/* global module, require */

module.exports = function(gulp, config) {

    'use strict';

    var $ = require('gulp-load-plugins')();
    var browserSync = require('browser-sync');
    var reload = browserSync.reload;
    // var historyApiFallback = require('connect-history-api-fallback');

    // Watch Files For Changes & Reload
    gulp.task('serve', ['jshint', 'styles', '_translate', '_environment'], function() {
        browserSync({
            notify: false,
            logPrefix: 'PSK',
            // Run as an https by uncommenting 'https: true'
            // Note: this uses an unsigned certificate which on first access
            //       will present a certificate warning in the browser.
            // https: true,
            server: {
                baseDir: [config.paths.tmp, config.paths.app],
                // middleware: [historyApiFallback()],
                routes: {
                    '/bower_components': 'bower_components'
                }
            }
        });

        gulp.watch([config.paths.app + '/**/*.html'], reload);
        gulp.watch([config.paths.app + '/**/*.css'], ['styles', reload]);
        gulp.watch([config.paths.app + '/**/*.js'], ['jshint']);
        gulp.watch([config.paths.app + '/resources/config/**/*.json'], ['_environment', reload]);
    });

    // Build and serve the output from the dist build
    gulp.task('serve:dist', ['default'], function() {
        browserSync({
            notify: false,
            logPrefix: 'PSK',
            // Run as an https by uncommenting 'https: true'
            // Note: this uses an unsigned certificate which on first access
            //       will present a certificate warning in the browser.
            // https: true,
            server: config.paths.dist
        });
    });
};
