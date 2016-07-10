'use strict';

var jsonFile = require('jsonfile');
var _ = require('lodash');
var commondir = require('commondir');
var fs = require('fs');
var path = require('path');

var generateReport = function(options) {

    var featureOutput = jsonFile.readFileSync(options.jsonFile);
    var packageJson = jsonFile.readFileSync('package.json', 'utf8');

    featureOutput.summary = {
        isFailed: false,
        passed: 0,
        failed: 0
    };

    var result = {
        status: {
            passed: 'passed',
            failed: 'failed',
            skipped: 'skipped',
            pending: 'pending',
            undefined: 'undefined'
        }
    };

    var suite = {
        name: packageJson.name,
        version: packageJson.version,
        time: new Date(),
        features: featureOutput,
        passed: 0,
        failed: 0,
        scenarios: {
            passed: 0,
            failed: 0,
            skipped: 0,
            notdefined: 0
        }
    };

    var setStats = function(suite) {
        var featureOutput = suite.features;
        var featuresSummary = suite.features.summary;
        var rootDir = commondir(_.map(featureOutput, 'uri'));
        var screenShotDirectory;
        suite.reportAs = 'features';

        screenShotDirectory = options.output ? path.join(options.output, '..', 'screenshot') : 'screenshot/';

        featureOutput.forEach(function(feature) {
            feature.relativeFolder = feature.uri.slice(rootDir.length);
            feature.scenarios = {};
            feature.scenarios.passed = 0;
            feature.scenarios.failed = 0;
            feature.scenarios.notdefined = 0;
            feature.scenarios.skipped = 0;
            feature.scenarios.pending = 0;
            featuresSummary.isFailed = false;

            if (!feature.elements) {
                return;
            }

            feature.elements.forEach(function(element) {
                element.passed = 0;
                element.failed = 0;
                element.notdefined = 0;
                element.skipped = 0;
                element.pending = 0;

                element.steps.forEach(function(step) {
                    if (step.embeddings !== undefined) {
                        var Base64 = require('js-base64').Base64;
                        step.embeddings.forEach(function(embedding) {
                            if (embedding.mime_type === 'text/plain') {
                                if (!step.text) {
                                    step.text = Base64.decode(embedding.data);
                                } else {
                                    step.text = step.text.concat('<br>' + Base64.decode(embedding.data));
                                }
                            } else {
                                var name = step.name && step.name.split(' ').join('_') || step.keyword.trim();
                                if (!fs.existsSync(screenShotDirectory)) {
                                    fs.mkdirSync(screenShotDirectory);
                                }
                                name = name + '_' + Math.round(Math.random() * 10000) + '.png'; //randomize the file name
                                var filename = path.join(screenShotDirectory, name);
                                fs.writeFileSync(filename, embedding.data, 'base64');
                                step.image = 'screenshot/' + name;
                            }
                        });
                    }

                    if (!step.result) {
                        return 0;
                    }
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

                    element.skipped++;
                });

                if (element.notdefined > 0) {
                    feature.scenarios.notdefined++;
                    return suite.scenarios.notdefined++;
                }

                if (element.failed > 0) {
                    feature.scenarios.failed++;
                    featuresSummary.isFailed = true;
                    return suite.scenarios.failed++;
                }

                if (element.skipped > 0) {
                    feature.scenarios.skipped++;
                    return suite.scenarios.skipped++;
                }

                if (element.pending > 0) {
                    feature.scenarios.pending++;
                    return suite.scenarios.pending++;
                }

                if (element.passed > 0) {
                    feature.scenarios.passed++;
                    return suite.scenarios.passed++;
                }
            });

            if (featuresSummary.isFailed) {
                featuresSummary.failed++;
                suite.failed++;
            } else {
                featuresSummary.passed++;
                suite.passed++;
            }

            if (options.reportSuiteAsScenarios) {
                suite.failed = suite.scenarios.failed;
                suite.passed = suite.scenarios.passed;
                suite.reportAs = 'scenarios';
            }

            return suite;

        });

        suite.features = featureOutput;

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
                _: _
            }),
            styles: readFile('style.css'),
            script: readFile('script.js'),
            piechart: (options.theme === 'bootstrap') ? readFile('piechart.js') : undefined
        })
    );

    console.log('Generated ' + options.output + ' successfully.');
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

    if (isValidJsonFile()) {
        generateReport(options);
        if (callback) {
            callback();
        } else {
            return true;
        }
    }
}

module.exports = {
    generate: generate
};
