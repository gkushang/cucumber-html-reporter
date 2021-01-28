'use strict';

var jsonFile = require('jsonfile');
var _ = require('lodash');
var fs = require('fs-extra');
var path = require('path');
var jsonDir = require('./jsonDir');
var open = require('open');
const chalk = require('chalk');
const emoji = require('node-emoji');
var searchFileUp = require('./searchFileUp');
var hierarchyReporter = require('./hierarchyReporter');
const guid = require('uuid/v4');
const isBase64 = (data) => data === Buffer.from(Buffer.from(data, 'base64').toString('utf8')).toString('base64');

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
        var unsafeCharacters = find || /[/\|:"*?<>]/g;
        if (name !== undefined) {
            name = name.trim().replace(unsafeCharacters, '_');
        }
        return name;
    };

    featureOutput.summary = {
        isFailed: false,
        passed: 0,
        failed: 0,
        ambiguous: 0,
        skipped: 0,
        notdefined: 0,
        pending: 0
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
        },
        steps: {
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

    function getColumnLayoutWidth() {
        const FULL_WIDTH = 12;
        const HALF_WIDTH = 6;

        if(options.columnLayout === 1) {
            return FULL_WIDTH;
        } else {
            return HALF_WIDTH;
        }
    }
    /**
     * Make human-readable duration for scenario steps
     * Sample Input: "2005366787"
     * Sample Output: "2s 5ms"
     */
    var calculateDuration = function (durationInNanoSeconds) {
        // convert it to MILLI_SECONDS
        var durationInMillis = _.floor(durationInNanoSeconds / 1000000);

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
        if (filename === 'script.js' && options.theme === 'foundation') {
            return readFile('../_common/foundation/' + filename);
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
        return _.template(readFileForRespectiveTemplates('features.html'))({
            suite: suite,
            _: _,
            calculateDuration: calculateDuration,
            columnLayoutWidth: getColumnLayoutWidth(),
            decideScenarioTitlePadding: preventOverlappingTheScenarioTitle,
            guid: guid
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
        var topLevelFeaturesOrSets = [];
        var featuresSummary = suite.features.summary;
        var screenshotsDirectory;
        suite.reportAs = 'Features';
        if(options.screenshotsDirectory) {
            screenshotsDirectory = options.screenshotsDirectory;
        } else {
            screenshotsDirectory = options.output ? path.join(options.output, '..', 'screenshots') : 'screenshots';
        }

        var basedir = hierarchyReporter.getBaseDir(suite);

        const setOutput = [];
        const setsByHierarchy = {};
        featureOutput.forEach(f => {
            const match = f.name.match(/\[([^\]]+)\] (.*)/);
            if (match && match.length) {
                const setHierarchyHash = match[1];
                const setHierarchy = setHierarchyHash.split(';');
                const featureName = match[2];

                f.name = featureName;
                if (!setsByHierarchy[setHierarchyHash]) {
                    let currentSetHierarchyHash = '';
                    let currentSetHierarchy;
                    setHierarchy.forEach(s => {
                        if (currentSetHierarchyHash) {
                            currentSetHierarchyHash += ';' + s;
                        } else {
                            currentSetHierarchyHash = s;
                        }

                        if (!setsByHierarchy[currentSetHierarchyHash]) {
                            setsByHierarchy[currentSetHierarchyHash] = {
                                "keyword": "Set",
                                "name": s,
                                "id": s,
                                "elements": []
                            };

                            if (currentSetHierarchy) {
                                currentSetHierarchy.elements.push(setsByHierarchy[currentSetHierarchyHash]);
                                currentSetHierarchy = setsByHierarchy[currentSetHierarchyHash];
                            } else {
                                currentSetHierarchy = setsByHierarchy[currentSetHierarchyHash];
                                setOutput.push(currentSetHierarchy);
                            }
                        } else {
                            currentSetHierarchy = setsByHierarchy[currentSetHierarchyHash];
                        }
                    });
                }

                setsByHierarchy[setHierarchyHash].elements.push(f);
            } else {
                setOutput.push(f);
            }
        });

        const handleFeatures = (featuresOrSets, level) => {
            if (!featuresOrSets || !featuresOrSets.length) {
                return;
            }

            for (let i = 0; i < featuresOrSets.length; i++) {
                const featureOrSet = featuresOrSets[i];

                if (featureOrSet.keyword === 'Set') {
                    const set = featureOrSet;
                    handleFeatures(set.elements, level + 1);

                    set.featuresOrSets = {};
                    set.featuresOrSets.passed = 0;
                    set.featuresOrSets.failed = 0;
                    set.featuresOrSets.notdefined = 0;
                    set.featuresOrSets.skipped = 0;
                    set.featuresOrSets.pending = 0;
                    set.featuresOrSets.ambiguous = 0;
                    set.featuresOrSets.count = set.elements.length;
                    set.time = 0;

                    for (let l = 0; l < set.elements.length; l++) {
                        const e = set.elements[l];
                        const itemDescriptor = e.scenarios || e.featuresOrSets;
                        set.featuresOrSets.passed += (itemDescriptor.passed && !itemDescriptor.failed ? 1 : 0);
                        set.featuresOrSets.failed += (itemDescriptor.failed ? 1 : 0);
                        set.featuresOrSets.notdefined += (itemDescriptor.notdefined === itemDescriptor.count ? 1 : 0);
                        set.featuresOrSets.skipped += (itemDescriptor.skipped === itemDescriptor.count ? 1 : 0);
                        set.featuresOrSets.pending += (itemDescriptor.pending === itemDescriptor.count ? 1 : 0);
                        set.featuresOrSets.ambiguous += (itemDescriptor.ambiguous === itemDescriptor.count ? 1 : 0);
                        set.time += e.time;
                    }

                    if (level === 0) {
                        topLevelFeaturesOrSets.push(set);
                    }
                } else {
                    const feature = featureOrSet;
                    feature.hierarchy = hierarchyReporter.getFeatureHierarchy(feature.uri, basedir);
                    feature.scenarios = {};
                    feature.scenarios.passed = 0;
                    feature.scenarios.failed = 0;
                    feature.scenarios.notdefined = 0;
                    feature.scenarios.skipped = 0;
                    feature.scenarios.pending = 0;
                    feature.scenarios.ambiguous = 0;
                    feature.scenarios.count = 0;
                    feature.time = 0;
                    featuresSummary.isFailed = false;
                    featuresSummary.isAmbiguous = false;

                    if (!feature.elements) {
                        continue;
                    }

                    for (let j = 0; j < feature.elements.length; j++) {
                        const element = feature.elements[j];

                        element.passed = 0;
                        element.failed = 0;
                        element.notdefined = 0;
                        element.skipped = 0;
                        element.pending = 0;
                        element.ambiguous = 0;
                        element.time = 0;
                        element.timestamp = '';
                        element.notes = '';

                        if (element.type === 'background') {
                            continue;
                        }

                        for (let k = 0; k < element.steps.length; k++) {
                            const step = element.steps[k];
                            const count = k;

                            if (step.embeddings !== undefined) {
                                for (let h = 0; h < step.embeddings; h++) {
                                    const embedding = step.embeddings[h];
                                    var embeddingType = {};

                                    if (embedding.mime_type) {
                                        embeddingType = embedding.mime_type;
                                    } else if (embedding.media) {
                                        embeddingType = embedding.media.type;
                                    }
                                    if (['text/plain', 'text/html', 'application/json'].includes(embeddingType)) {
                                        var decoded;

                                        if (isBase64(embedding.data)) {
                                            decoded = Buffer.from(embedding.data, 'base64').toString('utf8');
                                        } else {
                                            decoded = embedding.data;
                                        }

                                        if (!step.text) {
                                            step.text = decoded;
                                        } else {
                                            step.text = step.text.concat(`<br>${decoded}`);
                                        }
                                    } else if (embeddingType === 'image/png') {
                                        step.image = 'data:image/png;base64,' + embedding.data;

                                        if (options.storeScreenshots && options.storeScreenshots === true) {

                                            var name = sanitize(step.name || step.keyword, /[^a-zA-Z0-9-]+/g); // Only allow URL-friendly file names
                                            if (!fs.existsSync(screenshotsDirectory)) {
                                                fs.mkdirSync(screenshotsDirectory);
                                            }
                                            name = name + '_' + Math.round(Math.random() * 10000) + '.png'; //randomize the file name
                                            var filename = path.join(screenshotsDirectory, name);
                                            fs.writeFileSync(filename, embedding.data, 'base64');
                                            if (options.noInlineScreenshots) step.image = path.relative(path.join(options.output, '..'), filename);
                                        }
                                    } else {
                                    var file = 'data:application/octet-stream;base64,' + embedding.data;
                                    var fileType = embedding.mime_type.split('/')[1];
                                    step.text = step.text || '';
                                    step.text = step.text.concat('<a href="'+file+'" download="file.'+fileType+'">download file</a>');
                                    }
                                }
                            }

                            if (!step.result || (step.hidden && !step.text && !step.image)) {
                                continue;
                            }

                            if (step.result.duration) element.time += step.result.duration;

                            if (step.output) {
                                if (options.scenarioTimestamp && count == 0) {
                                    element.timestamp = step.output[0];
                                }
                                for (let o = 0; o < step.output.length; o++) {
                                    const output = step.output[o];
                                    element.notes += output + '<br/>';
                                }
                            }

                            let stopProcess = false;
                            switch (step.result.status) {
                                case result.status.passed:
                                    element.passed++;
                                    stopProcess = true;
                                    break;
                                case result.status.failed:
                                    element.failed++;
                                    stopProcess = true;
                                    break;
                                case result.status.undefined:
                                    element.notdefined++;
                                    stopProcess = true;
                                    break;
                                case result.status.pending:
                                    element.pending++;
                                    stopProcess = true;
                                    break;
                                case result.status.ambiguous:
                                    element.ambiguous++;
                                    stopProcess = true;
                                    break;
                                default:
                                    break;
                            }

                            if (stopProcess) {
                                continue;
                            }
                          
                            element.skipped++;
                        }

                        suite.steps.passed += element.passed;
                        suite.steps.failed += element.failed;
                        suite.steps.notdefined += element.notdefined;
                        suite.steps.skipped += element.skipped;
                        suite.steps.pending += element.pending;
                        suite.steps.ambiguous += element.ambiguous;
                        suite.steps.count += element.steps;


                        if (element.time > 0) {
                            feature.time += element.time;
                        }

                        feature.scenarios.count++;

                        if (element.failed > 0) {
                            feature.scenarios.failed++;
                            featuresSummary.isFailed = true;
                            suite.scenarios.failed++;
                            continue;
                        }

                        if (element.ambiguous > 0) {
                            feature.scenarios.ambiguous++;
                            featuresSummary.isAmbiguous = true;
                            suite.scenarios.ambiguous++;
                            continue;
                        }

                        if (element.notdefined > 0) {
                            feature.scenarios.notdefined++;
                            suite.scenarios.notdefined++;
                            continue;
                        }

                        if (element.pending > 0) {
                            feature.scenarios.pending++;
                            suite.scenarios.pending++;
                            continue;
                        }

                        if (element.skipped > 0) {
                            feature.scenarios.skipped++;
                            suite.scenarios.skipped++;
                            continue;
                        }

                        if (element.passed > 0) {
                            feature.scenarios.passed++;
                            suite.scenarios.passed++;
                            continue;
                        }

                    }

                    var subSuite = undefined;
                    if (options.theme === 'hierarchy') {
                        subSuite = hierarchyReporter.findOrCreateSubSuite(suite, feature.hierarchy);
                    }
                    if (subSuite) {
                        subSuite.features.push(feature);
                    }

                    if (featuresSummary.isFailed) {
                        featuresSummary.failed++;
                        subSuite ? hierarchyReporter.recursivelyIncrementStat(subSuite, 'failed') : suite.failed++;
                    } else if (featuresSummary.isAmbiguous) {
                        featuresSummary.ambiguous++;
                        subSuite ? hierarchyReporter.recursivelyIncrementStat(subSuite, 'ambiguous') : suite.ambiguous++;
                    } else if (feature.scenarios.count === feature.scenarios.skipped) {
                        featuresSummary.skipped++;
                        subSuite ? hierarchyReporter.recursivelyIncrementStat(subSuite, 'passed') : suite.passed++;
                    } else if (feature.scenarios.count === feature.scenarios.notdefined) {
                        featuresSummary.notdefined++;
                        subSuite ? hierarchyReporter.recursivelyIncrementStat(subSuite, 'passed') : suite.passed++;
                    } else if (feature.scenarios.count === feature.scenarios.pending) {
                        featuresSummary.pending++;
                        subSuite ? hierarchyReporter.recursivelyIncrementStat(subSuite, 'passed') : suite.passed++;
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

                    if (level === 0) {
                        topLevelFeaturesOrSets.push(feature);
                    }
                }
            }
        };
        handleFeatures(setOutput, 0);

        suite.featuresOrSets = topLevelFeaturesOrSets;
        suite.featuresOrSets.summary = featuresSummary;

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
        _.template(readFile('index.html'))({
            suite: suite,
            features: getFeaturesTemplate(suite),
            styles: readFileForRespectiveTemplates('style.css'),
            script: readFileForRespectiveTemplates('script.js'),
            screenshot: readFile('../_common/screenshot.js'),
            piechart: ((options.theme === 'bootstrap') || (options.theme === 'hierarchy')) ? readFileForRespectiveTemplates('piechart.js') : undefined,
            guid: guid
        })
    );

 console.log('\n' +
        chalk.green.bold(emoji.emojify(':rocket:') + ' Cucumber HTML report ' + chalk.blue.bold(options.output) + ' generated successfully ') +
        emoji.emojify(':thumbsup:')
    );

};

function generate(options, callback) {

    function isValidJsonFile() {
        options.jsonFile = options.jsonFile || options.output + '.json';

        function isAFile(filePath) {
            try {
                return fs.statSync(filePath).isFile();
            } catch (err) {
                return false;
            }
        }

        if(!isAFile(options.jsonFile)) {
            var jsonFilePath = options.jsonFile;
            var dynamicReportJsonFileName = fs.readdirSync(jsonFilePath, 'utf-8');
            options.jsonFile = jsonFilePath + "/" + dynamicReportJsonFileName[0];
        }

        try {
            JSON.parse(JSON.stringify(jsonFile.readFileSync(options.jsonFile)));
            return true;
        } catch (e) {
          console.log('\n' +
                chalk.bold.red(emoji.emojify(':warning:  ') + emoji.emojify(':disappointed: ') + 'Unable to parse cucumberjs output into json: \'%s\'', options.jsonFile, e)
            );
            if (callback) {
                callback('Unable to parse cucumberjs output into json: \'' + options.jsonFile + '\'. Error: ' + e);
            } else {
                return false;
            }
        }
    }

   async function launchReport() {
        if (fs.existsSync(options.output) && (options.launchReport || options.launchReport === 'true')) {
            await open(options.output, {wait: false});
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
