'use strict';

var jsonFile = require('jsonfile');
var _ = require('lodash');
var fs = require('fs-extra');
var path = require('path');
var jsonDir = require('./jsonDir');
var open = require('open');
var searchFileUp = require('./searchFileUp');
var hierarchyReporter = require('./hierarchyReporter');

var generateReport = function (options) {

    var featureOutput = jsonFile.readFileSync(options.jsonFile);
    var packageJsonPath = searchFileUp('package.json');
    var packageJson = {};
    try {
        packageJson = packageJsonPath && jsonFile.readFileSync(packageJsonPath, 'utf8');
    } catch (err) {
        console.warn('No package.json file found in: ' + packageJsonPath + ', using default name and version.');
        packageJson.name = 'default';
        packageJson.version = '0.0.0';
    }

    var sanitize = function (name, find) {
        var unsafeCharacters = find || /[\/\\\|:"\*\?<>]/g;
        name = name.trim().replace(unsafeCharacters, '_');
        return name;
    };

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
        name: {
            plain: options.name || packageJson && packageJson.name,
            sanitized: sanitize(options.name || packageJson && packageJson.name, /[^a-z|0-9]/g)
        },
        brandTitle: options.brandTitle,
        version: packageJson && packageJson.version,
        time: new Date(),
        features: featureOutput,
        passed: 0,
        failed: 0,
        ambiguous: 0,
        totalTime: 0,
        suites: [],
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

    /**
     * Make human-readable duration for scenario steps
     * Sample Input: "2005366787"
     * Sample Output: "2s 5ms"
     */
    var calculateDuration = function (durationInMillis) {
        var oneMilliSecond = 1000;
        var oneMinute = 60 * oneMilliSecond;
        var formattedDuration = '0s';

        function format(min, sec, ms) {
            var MINUTES = 'm ';
            var SECONDS = 's ';
            var MILLI_SECONDS = 'ms';
            var formattedTimeStamp = '';

            min > 0 ? formattedTimeStamp += min + MINUTES : '';
            sec > 0 ? formattedTimeStamp += sec + SECONDS : '';
            ms > 0 ? formattedTimeStamp += ms + MILLI_SECONDS : '';

            return formattedTimeStamp.trim().length === 0 ? '< 1ms' : formattedTimeStamp;
        }

        if (!isNaN(durationInMillis)) {

            var min = _.floor(durationInMillis / oneMinute);
            var sec = _.floor((durationInMillis % oneMinute) / oneMilliSecond);
            var ms = durationInMillis % oneMilliSecond;

            formattedDuration = format(min, sec, ms);
        }

        return formattedDuration;
    };

    var preventOverlappingTheScenarioTitle = function (element) {
        var counter = 0;

        if (element.passed) counter++;
        if (element.notdefined) counter++;
        if (element.pending) counter++;
        if (element.skipped) counter++;
        if (element.failed) counter++;
        if (element.ambiguous) counter++;

        counter = (counter * 20) + 10;

        return counter + 'px';
    };

    var readFileForRespectiveTemplates = function (filename) {
        if (filename === 'script.js' && ((options.theme === 'simple') || (options.theme === 'foundation'))) {
            return readFile('../_common/simple.foundation/' + filename);
        }
        return ((options.theme === 'bootstrap') || (options.theme === 'hierarchy')) ? readFile('../_common/bootstrap.hierarchy/' + filename) : readFile(filename);
    };

    /**
     * NOTE: This method is used by hierarchy report template, harmless for others.
     * Creates the HTML fragments for any features assigned to this suite,
     * and stores them in `featureMarkup` attribute of the suite so we can render them in index.tmpl
     *
     * @param suite
     */

    var getFeaturesTemplate = function (suite) {
        return _.template(readFileForRespectiveTemplates('features.tmpl'))({
            suite: suite,
            _: _,
            calculateDuration: calculateDuration,
            decideScenarioTitlePadding: preventOverlappingTheScenarioTitle
        });
    };

    var setupSubSuiteTemplates = function (suite) {
        suite.featureMarkup = '<div style="display: none;">No features</div>';
        if (suite.features && suite.features.length) {
            suite.featureMarkup = getFeaturesTemplate(suite);
        }
        for (var i = 0; i < suite.suites.length; i++) {
            var subSuite = suite.suites[i];
            setupSubSuiteTemplates(subSuite);
        }
    };

    var setStats = function (suite) {
        var featureOutput = suite.features;
        var topLevelFeatures = [];
        var featuresSummary = suite.features.summary;
        var screenshotsDirectory;
        suite.reportAs = 'Features';

        if(options.screenshotsDirectory) {
            screenshotsDirectory = options.screenshotsDirectory;
        } else {
            screenshotsDirectory = options.output ? path.join(options.output, '..', 'screenshots') : 'screenshots';
        }

        var basedir = hierarchyReporter.getBaseDir(suite);

        featureOutput.forEach(function (feature) {
            feature.hierarchy = hierarchyReporter.getFeatureHierarchy(feature.uri, basedir);
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
                        step.embeddings.forEach(function (embedding) {

                            if (embedding.mime_type === 'text/plain') {
                                if (!step.text) {
                                    step.text = embedding.data;
                                } else {
                                    step.text = step.text.concat('<br>' + embedding.data);
                                }
                            } else if (embedding.mime_type === 'application/json') {
                                var decoded = new Buffer(embedding.data, 'base64').toString('ascii');

                                if (!step.text) {
                                    step.text = decoded;
                                } else {
                                    step.text = step.text.concat('<br>' + decoded);
                                }
                            } else if (embedding.mime_type === 'image/png') {
                                step.image = 'data:image/png;base64,' + embedding.data;

                                if ((options.storeScreenshots && options.storeScreenshots === true) ||
                                    (options.storeScreenShots && options.storeScreenShots === true)) {

                                    var name = sanitize(step.name || step.keyword);
                                    if (!fs.existsSync(screenshotsDirectory)) {
                                        fs.mkdirSync(screenshotsDirectory);
                                    }
                                    name = name + '_' + Math.round(Math.random() * 10000) + '.png'; //randomize the file name
                                    var filename = path.join(screenshotsDirectory, name);
                                    fs.writeFileSync(filename, embedding.data, 'base64');
                                }
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

            var subSuite = undefined;
            if (options.theme === 'hierarchy') {
                subSuite = hierarchyReporter.findOrCreateSubSuite(suite, feature.hierarchy);
            }
            if (subSuite) {
                subSuite.features.push(feature);
            } else {
                topLevelFeatures.push(feature);
            }

            if (featuresSummary.isFailed) {
                featuresSummary.failed++;
                subSuite ? hierarchyReporter.recursivelyIncrementStat(subSuite, 'failed') : suite.failed++;
            } else if (featuresSummary.isAmbiguous) {
                featuresSummary.ambiguous++;
                subSuite ? hierarchyReporter.recursivelyIncrementStat(subSuite, 'ambiguous') : suite.ambiguous++;
            } else {
                featuresSummary.passed++;
                subSuite ? hierarchyReporter.recursivelyIncrementStat(subSuite, 'passed') : suite.passed++;
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

            suite.features = topLevelFeatures;
            suite.features.summary = featuresSummary;

            return suite;

        });

        suite.totalTime = calculateDuration(suite.totalTime);

        if (options.theme === 'hierarchy') {
            setupSubSuiteTemplates(suite);
        }

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
            features: getFeaturesTemplate(suite),
            styles: readFileForRespectiveTemplates('style.css'),
            script: readFileForRespectiveTemplates('script.js'),
            screenshot: readFile('../_common/screenshot.js'),
            piechart: ((options.theme === 'bootstrap') || (options.theme === 'hierarchy')) ? readFileForRespectiveTemplates('piechart.js') : undefined
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
