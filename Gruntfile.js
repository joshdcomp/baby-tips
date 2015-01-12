// This was set up using the help of this tut:
//http://merrickchristensen.com/articles/gruntjs-workflow.html


module.exports = function(grunt) {
    // grunt.loadNpmTasks('grunt-contrib-jshint'); // load lint

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        //watch for stuff when we save
        watch: {
            js: {
                files: ['pre/js/**/*.js', 'pre/js/*.js'],
                tasks: ['concat:js']
            },
            sass: {
                files: ['pre/sass/**/*.scss', 'pre/sass/**.scss'],
                tasks: ['sass:main']
            }
        },

        //set up concats
        concat: {
            options: {
                // Get the filepath for all js files and format it to be a
                //   separator for easier debugging in concatted files
                process: function(src, filepath){
                    var lines = '\n//--------------------------------------------------\n'
                    var final_name = filepath.substring(filepath.lastIndexOf('/scripts/') + 1, filepath.length);//.join('-');
                    return( lines
                            + '// Source: '
                            + final_name
                            + lines
                            + src);
                }
            },

            js: {
                src: ['pre/js/*.js', 'pre/js/**/*.js'],
                dest: 'www/js/scripts.js',
                nonull: true
            },//js
        },
        //set up sass
        sass: {
            main: {
                files:{
                    'www/css/main.css' : 'pre/sass/main-index.scss'
                }
            },

            prod: {
                options:{
                    style: 'compressed'
                },
                files: {
                    'www/css/main.css' : 'pre/sass/main-index.scss',
                }
            }
        },//sass
        //uglify
        uglify: {
            options: {
                //preserve variable and function names
                mangle: false
            },
            tools: {
                files: {
                    //minifies in place
                    '<%= concat.js.dest %>' : '<%= concat.js.dest %>'
                }
            }
        },//uglify

        clean:{
            js:['www/scripts/scripts.js'],
            styles: ['.sass-cache', 'www/css/main.css',]
        }
    });//initConfig

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-clean');
//-----------------------------------------------------------------------------
//CUSTOM CLI COMMANDS
    // All tasks we have going in the initconfig should be registered here. Else
    //   the cli won't know what we're asking
    grunt.registerTask('default', ['concat', 'sass:main', 'watch']);

    grunt.registerTask('js', ['concat:js', 'watch:js']);
    grunt.registerTask('js-w', ['concat:js']);

    grunt.registerTask('sass', ['sass:main', 'watch:sass']);
    grunt.registerTask('sass-w', ['sass:main']);

    //Production
    grunt.registerTask('prod', ['concat', 'sass:prod', 'uglify']);
};
