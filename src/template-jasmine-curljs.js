
"use strict";

var template = __dirname + '/templates/jasmine-curljs.html',
    _ = require('lodash'),
    curljs  = __dirname + '/../vendor/curl-0.8.4.js';

exports.process = function(grunt, task, context) {

  var src = context.scripts.src;
  var baseUrl = context.options.curlConfig && context.options.curlConfig.baseUrl;
  if (!baseUrl) {
    baseUrl = '/';
  }

  // Remove baseUrl and .js from src files
  src.forEach(function(script, i){
    if (baseUrl) {
      script = script.replace(new RegExp('^' + baseUrl),"");
    }
    src[i] = script.replace(/\.js$/,"");
  });

  // Prepend loaderPlugins to the appropriate files
  if (context.options.loaderPlugin) {
    Object.keys(context.options.loaderPlugin).forEach(function(type){
      if (context[type]) {
        context[type].forEach(function(file,i){
          context[type][i] = context.options.loaderPlugin[type] + '!' + file;
        });
      }
    });
  }

  task.copyTempFile(curljs,'curl.js');

  var source = grunt.file.read(template);

  return _.template(source, {imports: context})();
};

