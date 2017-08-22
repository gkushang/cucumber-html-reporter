var path = require('path');
var fs = require('fs-extra');
var find = require('find');
var reporter = require('../index');
var assertHtmlReports = require('./assert/assertHtmlReports');

var theme = {
    hierarchy: 'hierarchy',
    bootstrap: 'bootstrap',
    foundation: 'foundation',
    simple: 'simple'
};

var outputDirectory = 'test/report/';
var jsonFile = 'test/report/cucumber_report.json';
var jsonDir = 'test/report/multi';

function removeReports() {
    var files = find.fileSync(/\.html/, outputDirectory);
    files.map(function (file) {
        fs.unlinkSync(file);
    });
}

function getOptions(theme) {
    return {
        name: '@cucumber-html-reporter/*&!@#$%)(~<>`', //this tests for the sanitized hyperlinks on report, otherwise this should be plain text english
        theme: theme,
        output: path.join(outputDirectory, 'cucumber_report_' + theme + '.html'),
        reportSuiteAsScenarios: true,
        launchReport: true,
        storeScreenshots: true,
        screenshotsDirectory: 'screenshots/',
        metadata: {
            'App Version': '0.3.2',
            'Test Environment': 'STAGING',
            'Browser': 'Chrome  54.0.2840.98',
            'Platform': 'Windows 10',
            'Parallel': 'Scenarios',
            'Executed': 'Remote'
        }
    };
}

function getJsonFileOptions(theme) {
    var options = getOptions(theme);
    options.jsonFile = jsonFile;
    return options;
}

function getJsonDirOptions(theme) {
    var options = getOptions(theme);
    options.jsonDir = jsonDir;

    return options;
}

function assertJsonFile() {

    //Generate Hierarchy theme report
    reporter.generate(getJsonFileOptions(theme.hierarchy));

    //Generate Bootstrap theme report
    reporter.generate(getJsonFileOptions(theme.bootstrap));

    //Generate Foundation theme report
    reporter.generate(getJsonFileOptions(theme.foundation));

    //Generate Simple theme report
    reporter.generate(getJsonFileOptions(theme.simple));

    //assert reports
    assertHtmlReports(outputDirectory);
}

function assertJsonDir() {
    //Generate Hierarchy theme report
    reporter.generate(getJsonDirOptions(theme.hierarchy));

    // Generate Bootstrap theme report
    reporter.generate(getJsonDirOptions(theme.bootstrap));

    //Generate Foundation theme report
    reporter.generate(getJsonDirOptions(theme.foundation));

    //Generate Simple theme report
    reporter.generate(getJsonDirOptions(theme.simple));

    //assert reports
    assertHtmlReports(outputDirectory);
}

assertJsonDir();

removeReports();

assertJsonFile();
