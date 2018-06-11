module.exports = function (config) {
  config.set({
    basePath: require('path').join(__dirname, './'),
    frameworks: ['jasmine'],
    client: {
      args: config.grep ? ['--grep', config.grep] : []
    },
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-phantomjs-launcher'),
      // require('karma-remap-istanbul'),
      require('karma-coverage'),
      require('karma-junit-reporter')
    ],

    // Proxied base paths for loading assets
    proxies: {
      // required for modules fetched by SystemJS
      '/node_modules/': '/base/node_modules/',
      '/base/node_modules/': './node_modules/',
    },

    files: [
      {pattern: 'node_modules/core-js/client/core.js', included: true, watched: false},
      //{pattern: 'node_modules/es6-shim/es6-shim.js', included: true, watched: false},
      {pattern: 'node_modules/systemjs/dist/system-polyfills.js', included: true, watched: false},
      {pattern: 'node_modules/systemjs/dist/system.src.js', included: true, watched: false},
      {pattern: 'node_modules/zone.js/dist/zone.js', included: true, watched: false},
      {pattern: 'node_modules/zone.js/dist/proxy.js', included: true, watched: false},
      {pattern: 'node_modules/zone.js/dist/sync-test.js', included: true, watched: false},
      {pattern: 'node_modules/zone.js/dist/jasmine-patch.js', included: true, watched: false},
      {pattern: 'node_modules/zone.js/dist/async-test.js', included: true, watched: false},
      {pattern: 'node_modules/zone.js/dist/fake-async-test.js', included: true, watched: false},

      // Include all Angular dependencies
      {pattern: 'node_modules/ckeditor/**/*', included: false, watched: false},
      {pattern: 'node_modules/@angular/**/*', included: false, watched: false},
      {pattern: 'node_modules/@rd/**/*', included: false, watched: false},
      {pattern: 'node_modules/rxjs/**/*', included: false, watched: false},
      {pattern: 'node_modules/moment/min/moment.min.js', included: false, watched: false},
      {pattern: 'node_modules/jssha/src/sha.js', included: true, watched: false},

      // 'build/systemjs.config.js',
      'base/node_modules/jssha/src/sha.js',
      'dist/browser-test-shim.js',

      //'build/**/*.+(js|js.map|css|html)',

      // Includes all package tests and source files into karma. Those files will be watched.
      // This pattern also matches all all sourcemap files and TypeScript files for debugging.
      // {pattern: 'build/**/*', included: false, watched: true}, /* may be needed for sourcemaps */
      {pattern: 'dist/lib/**', included: false, watched: true}
    ],

    preprocessors: {
      'dist/lib/**/!(*spec).js': ['coverage']
    },

    // add both "karma-coverage" and "karma-remap-coverage" reporters
    reporters: ['progress', 'coverage', 'junit'],

    // save interim raw coverage report in memory
    coverageReporter: {
      // specify a common output directory
      dir: 'coverage',
      reporters: [
        // reporters not supporting the `file` property
        // { type: 'html', subdir: 'report-html' },
        // { type: 'lcov', subdir: 'report-lcov' },
        // reporters supporting the `file` property, use `subdir` to directly
        // output them in the `dir` directory
        { type: 'json', subdir: '.', file: 'coverage.json' },
        { type: 'json', subdir: '.' },
        // { type: 'cobertura', subdir: '.', file: 'cobertura.xml' },
        { type: 'lcovonly', subdir: '.', file: 'lcov.info' },
        // { type: 'teamcity', subdir: '.', file: 'teamcity.txt' },
        // { type: 'text', subdir: '.', file: 'text.txt' },
        // { type: 'text-summary', subdir: '.', file: 'text-summary.txt' },
      ],
      check: {
        global: {
          statements: 75,
          branches: 55,
          functions: 75,
          lines: 75,
          excludes: [
            'foo/bar/**/*.js'
          ]
        },
        // each: {
        //   statements: 50,
        //   branches: 50,
        //   functions: 50,
        //   lines: 50,
        //   excludes: [
        //     'other/directory/**/*.js'
        //   ],
        //   overrides: {
        //     'baz/component/**/*.js': {
        //       statements: 98
        //     }
        //   }
        // }
      },
      watermarks: {
        statements: [70, 75],
        functions: [70, 75],
        branches: [70, 75],
        lines: [70, 75]
      }
    },

    // the default configuration
    junitReporter: {
      outputDir: 'dist/reports/junit', // results will be saved as $outputDir/$browserName.xml
      outputFile: 'junit.xml', // if included, results will be saved as $outputDir/$browserName/$outputFile
      suite: '@rd/compiler', // suite will become the package name attribute in xml testsuite element
      useBrowserName: false, // add browser name to report and classes names
      nameFormatter: undefined, // function (browser, result) to customize the name attribute in xml testcase element
      classNameFormatter: undefined, // function (browser, result) to customize the classname attribute in xml testcase element
      properties: {}, // key value pair of properties to add to the <properties> section of the report
      xmlVersion: null // use '1' if reporting to be per SonarQube 6.2 XML format
    },

    customLaunchers: {
      "Chrome_1024x768": {
        "base": "Chrome",
        "flags": [
          "--window-size=1024,768"
        ]
      }
    },

    exclude: [],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['PhantomJS'], /* Chrome_1024x768 */
    singleRun: false
  });
};
