// Karma configuration
// Generated on Thu Aug 06 2015 09:43:45 GMT+0200 (W. Europe Daylight Time)
var fs = require("fs")

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'requirejs', 'chai'],


    // list of files / patterns to load in the browser
    files: [
      'src/external/system.src.js',
      'src/external/babel-browser.js',
      {pattern: 'node_modules/chai/chai.js', included: false},
      {pattern: 'node_modules/mocha/mocha.js', included: false},
      {pattern: 'src/**/*.js', included: false},
      {pattern: 'serviceworker*', included: false},
      {pattern: 'test/**/*.js', included: false},
      {pattern: 'test-main.js', included: false},
      'src/external/focalStorage.js',
      'test-loader.js'
    ],

    proxies: {
      '/node_modules/chai/chai.js': '/base/node_modules/chai/chai.js',
      '/node_modules/mocha/mocha.js': '/base/node_modules/mocha/mocha.js',
      '/src/': '/base/src/',
      '/test/': '/base/test/',
      '/serviceworker-loader.js': '/base/serviceworker-loader.js',
      '/serviceworker.js': '/base/serviceworker.js'
    },


    // list of files to exclude
    // TODO: call github api from travis ci
    exclude: process.env.TRAVIS ? ['test/github-api-test.js'] : [],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'mocha'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],

    customLaunchers: {
      Chrome_Travis_CI: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      },
      ChromeCanary_Travis_CI: {
        base: 'ChromeCanary',
        flags: ['--no-sandbox']
      },
    },

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    browserNoActivityTimeout: 20000
  });

  if (!process.env.GithubToken) {
    console.log("\033[7m\033[31m****************************************************************************\033[0m");
    console.log("\033[7m\033[31m* You need to provide the \"GithubToken\" environment variable to run tests. *\033[0m");
    console.log("\033[7m\033[31m****************************************************************************\033[0m");
    process.exit(-1);
  }

  // insert the github token
  fs.writeSync(
    fs.openSync("test-main.js", "w"),
    "// AUTOGENERATED, please do not edit!!! \n" +fs.readFileSync("test-main.template.js", "utf8").replace("INSERTGITHUBTOKEN", process.env.GithubToken)
  );

  if(process.env.TRAVIS) {
    config.browsers = ['ChromeCanary_Travis_CI'];
  }
};
