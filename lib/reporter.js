'use strict';

var jsonFile = require('jsonfile');
var _ = require('lodash');
var fs = require('fs-extra');
var path = require('path');
var jsonDir = require('./jsonDir');
var open = require('open');
var searchFileUp = require('./searchFileUp');

var generateReport = function (options) {

    var featureOutput = jsonFile.readFileSync(options.jsonFile);
    var packageJsonPath = searchFileUp('package.json');
    var packageJson = packageJsonPath && jsonFile.readFileSync(packageJsonPath, 'utf8');

    featureOutput.summary = {
        isFailed: false,
        passed: 0,
        failed: 0,
        ambiguous: 0
    };

    var result = {
        status: {
            passed: 'passed',
            failed: 'failed',
            skipped: 'skipped',
            pending: 'pending',
            undefined: 'undefined',
            ambiguous: 'ambiguous'
        }
    };

    var suite = {
        name: options.name || packageJson && packageJson.name,
        brandTitle: options.brandTitle,
        version: packageJson && packageJson.version,
        time: new Date(),
        features: featureOutput,
        passed: 0,
        failed: 0,
        ambiguous: 0,
        totalTime: 0,
        scenarios: {
            passed: 0,
            failed: 0,
            skipped: 0,
            pending: 0,
            notdefined: 0,
            ambiguous: 0
        }
    };

    var createReportDirectoryIfNotExists = function () {
        if (!fs.existsSync(options.output)) {
            fs.mkdirsSync(path.dirname(options.output));
        }
    };

    createReportDirectoryIfNotExists();

    var calculateDuration = function (duration) {
        var oneNanoSecond = 1000000000;
        var oneMinute = 60 * oneNanoSecond;
        duration = parseInt(duration);

        function format(min, sec, ms) {
            var MINUTES = 'm ';
            var SECONDS = 's ';
            var MILLI_SECONDS = 'ms';
            var formattedTimeStamp = '';

            min > 0 ? formattedTimeStamp += min + MINUTES : '';
            sec > 0 ? formattedTimeStamp +=  sec + SECONDS : '';
            ms > 0 ? formattedTimeStamp +=  ms + MILLI_SECONDS : '';

            return formattedTimeStamp.trim().length === 0 ? '0s' : formattedTimeStamp;
        }

        if (!isNaN(duration)) {
            var min = _.floor(duration / oneMinute);
            var sec = _.round((duration % oneMinute) / oneNanoSecond);
            var ms = _.round((duration % oneNanoSecond) / 1000000);
            return format(min, sec, ms);
        }
    };

    var setStats = function (suite) {
        var featureOutput = suite.features;
        var featuresSummary = suite.features.summary;
        var screenShotDirectory;
        suite.reportAs = 'features';

        screenShotDirectory = options.output ? path.join(options.output, '..', 'screenshot') : 'screenshot/';

        featureOutput.forEach(function (feature) {
            feature.scenarios = {};
            feature.scenarios.passed = 0;
            feature.scenarios.failed = 0;
            feature.scenarios.notdefined = 0;
            feature.scenarios.skipped = 0;
            feature.scenarios.pending = 0;
            feature.scenarios.ambiguous = 0;
            feature.time = 0;
            featuresSummary.isFailed = false;
            featuresSummary.isAmbiguous = false;

            if (!feature.elements) {
                return;
            }

            feature.elements.forEach(function (element) {
                element.passed = 0;
                element.failed = 0;
                element.notdefined = 0;
                element.skipped = 0;
                element.pending = 0;
                element.ambiguous = 0;
                element.time = 0;

                if (element.type === 'background') {
                    return;
                }

                element.steps.forEach(function (step) {
                    if (step.embeddings !== undefined) {
                        var Base64 = require('js-base64').Base64;
                        step.embeddings.forEach(function (embedding) {

                            var sanitizeFileName = function (name) {
                                var unsafeCharacters = /[\/\\\|:"\*\?<>]/g;
                                name = name.trim();
                                name = name.replace(unsafeCharacters, ' ');
                                name = name.split(' ').join('_');
                                return name;
                            };

                            if (embedding.mime_type === 'text/plain') {
                                if (!step.text) {
                                    step.text = Base64.decode(embedding.data);
                                } else {
                                    step.text = step.text.concat('<br>' + Base64.decode(embedding.data));
                                }
                            } else if (options.storeScreenShots && options.storeScreenShots === true) {
                                var name = sanitizeFileName(step.name || step.keyword);
                                if (!fs.existsSync(screenShotDirectory)) {
                                    fs.mkdirSync(screenShotDirectory);
                                }
                                name = name + '_' + Math.round(Math.random() * 10000) + '.png'; //randomize the file name
                                var filename = path.join(screenShotDirectory, name);
                                fs.writeFileSync(filename, embedding.data, 'base64');
                                step.image = 'screenshot/' + name;
                            } else if (embedding.mime_type === 'image/png') {
                                step.image = 'data:image/png;base64,' + embedding.data
                            }
                        });
                    }

                    if (!step.result || (step.hidden && !step.text && !step.image)) {
                        return 0;
                    }

                    if (step.result.duration) element.time += step.result.duration;

                    if (step.result.status === result.status.passed) {
                        return element.passed++;
                    }
                    if (step.result.status === result.status.failed) {
                        return element.failed++;
                    }
                    if (step.result.status === result.status.undefined) {
                        return element.notdefined++;
                    }
                    if (step.result.status === result.status.pending) {
                        return element.pending++;
                    }
                    if (step.result.status === result.status.ambiguous) {
                        return element.ambiguous++;
                    }

                    element.skipped++;
                });

                if (element.time > 0) {
                    feature.time += element.time;
                }

                if (element.failed > 0) {
                    feature.scenarios.failed++;
                    featuresSummary.isFailed = true;
                    return suite.scenarios.failed++;
                }

                if (element.ambiguous > 0) {
                    feature.scenarios.ambiguous++;
                    featuresSummary.isAmbiguous = true;
                    return suite.scenarios.ambiguous++;
                }

                if (element.notdefined > 0) {
                    feature.scenarios.notdefined++;
                    return suite.scenarios.notdefined++;
                }

                if (element.pending > 0) {
                    feature.scenarios.pending++;
                    return suite.scenarios.pending++;
                }

                if (element.skipped > 0) {
                    feature.scenarios.skipped++;
                    return suite.scenarios.skipped++;
                }

                if (element.passed > 0) {
                    feature.scenarios.passed++;
                    return suite.scenarios.passed++;
                }

            });

            if (featuresSummary.isFailed) {
                featuresSummary.failed++;
                suite.failed++;
            } else if (featuresSummary.isAmbiguous) {
                featuresSummary.ambiguous++;
                suite.ambiguous++;
            } else {
                featuresSummary.passed++;
                suite.passed++;
            }

            if (options.reportSuiteAsScenarios) {
                suite.failed = suite.scenarios.failed;
                suite.passed = suite.scenarios.passed;
                suite.ambiguous = suite.scenarios.ambiguous;
                suite.reportAs = 'scenarios';
            }

            if (feature.time) {
                suite.totalTime += feature.time
            }

            return suite;

        });

        suite.totalTime = calculateDuration(suite.totalTime);

        suite.features = featureOutput;

        if (options.metadata) suite.metadata = options.metadata;

        return suite;
    };

    function readFile(fileName) {
        function getPath(name) {
            //use custom template based on user's requirement
            if (options.templateDir && fs.existsSync(path.join(options.templateDir, name))) {
                return path.join(options.templateDir, name);
            } else {
                return path.join(__dirname, '..', 'templates', options.theme, name);
            }
        }

        return fs.readFileSync(getPath(fileName), 'utf-8');
    }

    suite = setStats(suite);

    fs.writeFileSync(
        options.output,
        _.template(readFile('index.tmpl'))({
            suite: suite,
            features: _.template(readFile('features.tmpl'))({
                suite: suite,
                _: _,
                calculateDuration: calculateDuration
            }),
            styles: readFile('style.css'),
            script: readFile('script.js'),
            piechart: (options.theme === 'bootstrap') ? readFile('piechart.js') : undefined
        })
    );

    console.log('Cucumber HTML report ' + options.output + ' generated successfully.');
};

function generate(options, callback) {

    function isValidJsonFile() {
        options.jsonFile = options.jsonFile || options.output + '.json';

        try {
            JSON.parse(JSON.stringify(jsonFile.readFileSync(options.jsonFile)));
            return true;
        } catch (e) {
            console.error('Unable to parse cucumberjs output into json: \'%s\'', options.jsonFile, e);
            if (callback) {
                callback('Unable to parse cucumberjs output into json: \'' + options.jsonFile + '\'. Error: ' + e);
            } else {
                return false;
            }
        }
    }

    function launchReport() {
        if (fs.existsSync(options.output) && (options.launchReport || options.launchReport === 'true')) {
            open(options.output);
        }
    }

    if (options.jsonDir) {
        jsonDir.collectJSONS(options)
    }

    if (isValidJsonFile()) {
        generateReport(options);
        launchReport();
        return callback ? callback() : true;
    }
}

module.exports = {
    generate: generate
};
