'use strict';

var reporter = require('../../../index');

var stepDefs = function stepDefs() {
    this.Before(function(scenario, callback) {
        console.log('console logs should not break the report');
        this.scenario = scenario;
        callback();
    });

    this.registerHandler('AfterFeatures', function (features, callback) {
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
        
        callback();
    });

    this.Then(/^this feature runs with background$/, function(callback) {
        callback();
    });

    this.Then(/^Fred runs a passing cucumber scenario$/, function(callback) {
        callback();
    });

    this.Given(/^Fred runs a passing cucumber scenario on behalf of "([^"]*)"/, function (name, callback) {
        callback();
    });

    this.Then(/^he has the JSON cucumber formatted file at the end of run$/, function(callback) {
        callback();
    });
    
    this.Then(/^Fred runs a failing cucumber scenario$/, function(callback) {
        callback();
    });

    this.Then(/^a failing scenario captures a screenshot$/, function(callback) {
        this.scenario.attach(new Buffer('').toString('base64'), 'image/png');
        callback();
    });
    
    this.Then(/^he left one of the step as a pending$/, function(callback) {
        callback();
    });
    
    this.Then(/^the output should contain the skipped steps in the HTML pie chart$/, function(callback) {
        callback();
    });

    this.Then(/^Fred attaches the "([^"]*)" to the Given step of passing cucumber scenario$/, function(testData, callback) {
        this.scenario.attach(testData);
        callback();
    });

    this.Then(/^cucumber-html-reporter should create HTML report/, function(callback) {
        callback();
    });

    this.Given(/^Fred runs a passing scenario for the following data set$/, function (table, callback) {
        // Write code here that turns the phrase above into concrete actions
        callback();
    });

};


module.exports = stepDefs;
