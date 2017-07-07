// Karma configuration
// Generated on Wed Apr 19 2017 17:18:14 GMT+0530 (India Standard Time)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      //require('karma-coverage-istanbul-reporter'),
      require('@angular/cli/plugins/karma'),
       require('karma-requirejs'),
        require('karma-es6-shim')
    ],
     frameworks: ['jasmine', '@angular/cli','requirejs', 'es6-shim'],
    files: [
        './node_modules/requirejs/require.js',
        './node_modules/karma-es6-shim/lib/index.js',
      // './node_modules/karma-requirejs/lib/index.js',
      //  './node_modules/karma-requirejs/lib/adapter.js',
          { pattern: './src/app/*.ts', included: false },
          { pattern: './src/test.ts', included: false },
           { pattern: './src/app/**/*.ts', watched: false }
    ],
    exclude: [

    ],
    preprocessors: {
        './src/test.ts': ['@angular/cli']
    },
    mime: {
      'text/x-typescript': ['ts','tsx']
    },
      angularCli: {
      config: './angular-cli.json',
      environment: 'dev'
    },
     coverageIstanbulReporter: {
      reports: [ 'html', 'lcovonly' ],
      // base output directory 
      dir: './temp',
      fixWebpackSourcePaths: true
    },
     reporters: config.angularCli && config.angularCli.codeCoverage
              ? ['progress', 'coverage-istanbul']
              : ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: true
  })
}
