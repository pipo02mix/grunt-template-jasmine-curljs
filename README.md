CurlJS template for Jasmine unit tests
-----------------------------------------

Based on https://github.com/jsoverson/grunt-template-jasmine-requirejs

## Installation

```
npm install grunt-template-jasmine-curljs --save-dev
```

## Template Options

### templateOptions.curlConfig
Type: `Object`

This object is `JSON.stringify()`-ed into the template and passed into `curl.config()`



## Sample usage

```js
// Example configuration
grunt.initConfig({
  connect: {
    test : {
      port : 8000
    }
  },
  jasmine: {
    taskName: {
      src: 'src/**/*.js',
      options: {
        specs: 'spec/*Spec.js',
        helpers: 'spec/*Helper.js',
        host: 'http://127.0.0.1:8000/',
        template: require('grunt-template-jasmine-requirejs'),
        templateOptions: {
          curlConfig: {
            paths: {
              'app': 'src/app'
            }
          }
        }
      }
    }
  }
});
```

*Note* the usage of the 'connect' task configuration. You will need to use a task like
[grunt-contrib-connect][] if you need to test your tasks on a running server.

[grunt-contrib-connect]: https://github.com/gruntjs/grunt-contrib-connect

## Problems with `baseUrl`

Currently setting the baseUrl to anything other than `.` isn't supported. While the option is passed through ok, you currently include your specs by specifying their file path relative to the root of your project, so they will have the wrong path and won't be found. This can be worked around using packages but hopefully we'll find another way around this.

Gruntfile.coffee
```coffee
jasmine:
    conversocial:
        src: []
        options:
            specs: ["spec/javascripts/*.js"]
            template : require('grunt-template-jasmine-curljs')
            templateOptions:
                curlConfig :
                    baseUrl: 'spec/javascripts'
                    paths: {
                      'app': 'src/app'
                    }
```

Spec-runner
```js
curl.config({
    "baseUrl":"spec/javascripts",
    "paths":{
        "app":"src/app"
    }
});

// So unfortunately this is run
curl(['./spec/javsacripts/SomeTest', './spec/javsacripts/SomeOtherTest']);
// Instead of this
curl(['./SomeTest', './SomeOtherTest']);
```

## CurlJS notes

If you end up using this template, it's worth looking at the
[source]() in order to familiarize yourself with how it loads your files. The load process
consists of a series of nested `curl` blocks, incrementally loading your source and specs:

```js
<script>
[*JASMINE FILES*]
[*YOUR SPEC HELPERS*]
[*YOUR VENDOR FILES*]
</script>

curl([*YOUR SOURCE*], function() {
  curl([*YOUR SPECS*, *JASMINE REPORTERS*], function() {
    curl([*GRUNT-CONTRIB-JASMINE FILES*], function() {
      // at this point your tests are already running.
    }
  }
}
```

Note that grunt jasmine files and reporters are loaded as normal javascript files and so use the `js!` plugin. Your Jasmine specs are expected to be AMD modules however, as you'd expect.

## Writing Specs

Since everything is done via AMD all you need to do it wrap them in a define!

```js
define(['app/someModule'], function(SomeModule) {

    describe("My Amazing Test", function() {
        it("Can calculated 2+2", function() {
            expect(2*2).toBe(4);
        });
    });

});
```
