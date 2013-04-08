/*global module:false*/
module.exports = function(grunt) {
  "use strict";

  // Project configuration.
  grunt.initConfig({
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      lib_test: {
        files: '<%= jshint.lib_test.src %>',
        tasks: ['jshint:lib_test']
      }
    },
    connect: {
      test: {
        port: 8000,
        base: '.'
      }
    },
    jasmine: {
      curljs: {
        //src: 'test/fixtures/curljs/src/**/*.js',
        options: {
          specs: 'test/fixtures/curljs/spec/*Spec.js',
          helpers: 'test/fixtures/curljs/spec/*Helper.js',
          host: 'http://127.0.0.1:<%= connect.test.port %>/',
          template : require('./'),
          templateOptions: {
            curlConfig : {
              baseUrl: ''
            }
          }
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.registerTask('test', ['connect', 'jasmine:curljs']);

  // Default task.
  grunt.registerTask('default', ['jshint','test']);

};
