module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        concat: {
            app: {
                src: [
                    'app/app.js',
                    'app/controllers/**/*.js',
                    'app/services/**/*.js',
                    'app/directives.js',
                    'app/filters.js'
                ],
                dest: 'web/js/main.js'
            }
        },
        less: {
            styles: {
                files: {
                    "web/css/main.css": "less/main.less"
                }
            }
        },
        watch: {
            styles: {
                files: [
                    'less/**/*.less'
                ],
                tasks: ['less'],
                options: {
                    spawn: false
                }
            },
            scripts: {
                files: ['app/**/*.js'],
                tasks: ['concat'],
                options: {
                    spawn: false
                }
            }
        }
    });

    grunt.registerTask('default', ['watch']);
    grunt.registerTask('build', []);

};