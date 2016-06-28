'use strict';

var reporter = require('../../../index');
var assertHtmlReports = require('../../assert/assertHtmlReports');

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

        function getOptions(theme) {
            return {
                theme: theme,
                jsonFile: 'test/report/cucumber_report.json',
                output: 'test/report/cucumber_report_' + theme + '.html',
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
        assertHtmlReports();

        callback();
    });
};

module.exports = hooks;