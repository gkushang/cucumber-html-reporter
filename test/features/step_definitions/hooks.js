'use strict';

var reporter = require('../../../index');
var assertHtmlReports = require('../../assert/assertHtmlReports');
var path = require('path');

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

        function getOptions(theme) {
            return {
                theme: theme,
                jsonFile: 'test/report/cucumber_report.json',
                output: path.join(outputDirectory, 'cucumber_report_' + theme + '.html'),
                reportSuiteAsScenarios: true
            };
        }

        //Generate Bootstrap theme report
        reporter.generate(getOptions(theme.bootstrap));

        //Generate Foundation theme report
        reporter.generate(getOptions(theme.foundation));

        //Generate Simple theme report
        reporter.generate(getOptions(theme.simple));

        //assert reports
        assertHtmlReports(outputDirectory);

        callback();
    });
};

module.exports = hooks;