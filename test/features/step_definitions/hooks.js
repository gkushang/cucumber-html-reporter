'use strict';

var reporter = require('../../../index');
var assertHtmlReports = require('../../assert/assertHtmlReports');
var path = require('path');
var fs = require('fs');
var find = require('find');

var hooks = function() {
    this.Before(function(scenario, callback) {
        console.log('console logs should not break the report');
        this.scenario = scenario;
        callback();
    });

    this.registerHandler('AfterFeatures', function(features, callback) {

        var theme = {
            bootstrap: 'bootstrap',
            foundation: 'foundation',
            simple: 'simple'
        };

        var outputDirectory = 'test/report/';
        var jsonFile = 'test/report/cucumber_report.json';
        var jsonDir = 'test/report/multi';

        function removeReports() {
            var files = find.fileSync(/\.html/, outputDirectory);
            files.map(function(file) {
                fs.unlinkSync(file);
            });
        }

        function getOptions(theme) {
            return {
                theme: theme,
                output: path.join(outputDirectory, 'cucumber_report_' + theme + '.html'),
                reportSuiteAsScenarios: true
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
            //Generate Bootstrap theme report
            reporter.generate(getJsonDirOptions(theme.bootstrap));

            //Generate Foundation theme report
            reporter.generate(getJsonDirOptions(theme.foundation));

            //Generate Simple theme report
            reporter.generate(getJsonDirOptions(theme.simple));

            //assert reports
            assertHtmlReports(outputDirectory);
        }

        assertJsonFile();

        removeReports();

        assertJsonDir();

        callback();
    });
};

module.exports = hooks;