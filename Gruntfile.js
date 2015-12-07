module.exports = function(grunt) {
  "use strict";

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      all: [
        'src/speechkitt.js',
        'Gruntfile.js',
        'test/corti.js',
        'test/spec/*Spec.js'
      ],
      options: {
        jshintrc: true
      }
    },
    uglify: {
      dist: {
        options: {
          preserveComments: /^\! /
        },
        files: {
          'dist/speechkitt.min.js': ['src/speechkitt.js']
        }
      }
    },
    watch: {
      files: ['src/speechkitt.js', 'test/corti.js', 'test/spec/**.js', '!**/node_modules/**'],
      tasks: ['default']
    },
    jasmine: {
      testAndCoverage: {
        src: ['src/speechkitt.js', 'test/corti.js'],
        options: {
          specs: ['test/spec/*Spec.js'],
          outfile: 'test/SpecRunner.html',
          vendor: ['test/vendor/jquery-2.1.4.min.js', 'test/vendor/jasmine-jquery.js'],
          keepRunner: true,
          template: require('grunt-template-jasmine-istanbul'),
          templateOptions: {
            coverage: 'test/coverage/coverage.json',
            report: [
              {
                type: 'html',
                options: {
                  dir: 'test/coverage'
                }
              },
              {
                type: 'text'
              }
            ],
            thresholds: {
              lines: 50,
              statements: 50,
              branches: 50,
              functions: 50
            }
          }
        }
      }
    }
  });

  // Load NPM Tasks
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['jshint', 'uglify', 'jasmine']);

  // Test task
  grunt.registerTask('test', ['jshint', 'jasmine']);

};
