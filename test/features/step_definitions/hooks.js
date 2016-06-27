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
            bootstrap: 'templates/bootstrap',
            foundation: 'templates/foundation',
            simple: 'templates/simple'
        };

        function getOptions(theme) {
            return {
                templateDir: theme.template, //this is required only for unit-test of this module, otherwise pass `theme: [value]` as an option
                output: 'test/report/cucumber_report_' + theme.name + '.html',
                jsonFile: 'test/report/cucumber_report.json',
                theme: theme.theme,
                reportSuiteAsScenarios: true
            };

        }

        reporter.generate(getOptions({template: theme.bootstrap, name: 'bootstrap', theme: 'bootstrap'}));
        reporter.generate(getOptions({template: theme.foundation, name: 'foundation'}));
        reporter.generate(getOptions({template: theme.simple, name: 'simple'}));

        assertHtmlReports();

        callback();
    });
};

module.exports = hooks;