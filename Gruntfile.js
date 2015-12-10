var path = require('path');

module.exports = function(grunt) {
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        nodemon: {
            dev: {
                script: './bin/www',
                options: {
                    nodeArgs: [],
                    env: {
                        "NODE_ENV": "development"
                    },
                    watch: ['*.*'],
                    delay: 300,
                    callback: function (nodemon) {
                        nodemon.on('log', function (event) {
                            console.log(event.colour);
                        });

                        nodemon.on('restart', function () {
                            // Delay before server listens on port
                            setTimeout(function() {
                                require('fs').writeFileSync('.rebooted', 'rebooted');
                            }, 1000);
                        });
                    }
                }
            }
        },
        concat: {
            dist: {
                src: [
                    'public/scss/recipe.scss',
                    //'public/bower_components/normalize-css/normalize.css',
                    //'public/bower_components/font-awesome/css/font-awesome.css',
                    //'public/bower_components/pure/pure-min.css'
                ],
                dest: 'public/scss/build.scss',
            }
        },
        sass: {
            options: {
                sourceMap: true
            },
            dist: {
                files: {
                    'public/css/build.css': 'public/scss/build.scss'
                }
            }
        },
        watch: {
            sass: {
                files: ['public/scss/*.scss'],
                tasks: ['concat', 'sass'],
                options: {
                    livereload: true
                }
            },
            js: {
                files: ['public/**/*.js', 'components/**/*.js', '**/*.jsx', '!public/js/components.js'],
                tasks: ['browserify'],
                options: {
                    livereload: true
                }
            },
            nodemon: {
                files: ['.rebooted'],
                options: {
                    livereload: true
                }
            }
        },
        concurrent: {
            dev: ["nodemon", "watch"],
            options: {
                logConcurrentOutput: true
            }
        },
        browserify: {
            options: {
                transform: [ require('grunt-react').browserify ]
            },
            components: {
                src: ['components/**/*.jsx', 'routes/**/*.jsx'],
                dest: 'public/js/components.js'
            }
        }
    });

    grunt.registerTask('compileSass', ['concat', 'sass']);
    grunt.registerTask('jsx', ['browserify']);
    grunt.registerTask("default", ["concurrent:dev"]);
};