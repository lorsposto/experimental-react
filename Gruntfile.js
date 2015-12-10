var path = require('path');

module.exports = function(grunt) {
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        nodemon: {
            server: {
                script: './bin/lorrainesposto-www',
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
                                require('fs').writeFileSync('.rebooted-lorrainesposto', 'rebooted');
                            }, 1000);
                        });
                    }
                }
            },
            api: {
                script: './bin/api-www',
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
                                require('fs').writeFileSync('.rebooted-api', 'rebooted');
                            }, 1000);
                        });
                    }
                }
            }
        },
        concat: {
            default: {
                src: [
                    'lorrainesposto/public/src/scss/recipe.scss',
                    //'public/bower_components/normalize-css/normalize.css',
                    //'public/bower_components/font-awesome/css/font-awesome.css',
                    //'public/bower_components/pure/pure-min.css'
                ],
                dest: 'lorrainesposto/public/src/scss/build.scss',
            }
        },
        sass: {
            options: {
                sourceMap: true,
            },
            dev: {
                files: {
                    'lorrainesposto/public/src/css/build.css': 'lorrainesposto/public/src/scss/build.scss'
                }
            },
            dist: {
                files: {
                    'lorrainesposto/public/dist/css/build.css': 'lorrainesposto/public/src/scss/build.scss'
                }
            }
        },
        watch: {
            sass: {
                files: ['**/*.scss'],
                tasks: ['concat', 'sass:dev']
            },
            browserify: {
                files: ['lorrainesposto/**/*.{jsx,js}', '!lorrainesposto/public/*/js/components.js'],
                tasks: ['browserify:dev']
            },
            nodemon: {
                files: ['.rebooted-*']
            }
        },
        concurrent: {
            server: ["nodemon:server", "watch"],
            api: ["nodemon:api"],
            options: {
                logConcurrentOutput: true
            }
        },
        browserify: {
            options: {
                transform: [
                    ["babelify", {
                        presets: ['react', 'es2015'],
                        plugins: ['transform-react-jsx']
                    }],
                    'reactify'
                ]
            },
            dev: {
                src: ['lorrainesposto/routes/index.jsx', 'lorrainesposto/components/client/Browser.jsx'],
                dest: 'lorrainesposto/public/src/js/components.js'
            },
            dist: {
                src: ['lorrainesposto/routes/index.jsx'],
                dest: 'lorrainesposto/public/dist/js/components.js'
            }
        }

    });

    grunt.registerTask('style', ['concat', 'sass:dev']);
    grunt.registerTask("server", ["concurrent:server"]);
    grunt.registerTask("api", ["concurrent:api"]);
};