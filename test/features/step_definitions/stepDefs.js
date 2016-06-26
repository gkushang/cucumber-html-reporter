'use strict';

var reporter = require('../../../index');

var stepDefs = function stepDefs() {
    this.Before(function(scenario, callback) {
        console.log('console logs should not break the report');
        this.scenario = scenario;
        callback();
    });

    this.registerHandler('AfterFeatures', function (features, callback) {
        var options = {
            // theme: 'bootstrap',
            output: 'test/report/cucumber_report.html',
            jsonFile: 'test/report/cucumber_report.json'
        };

        //this is required only for unit-test of this module
        // specify templateDir
        options.templateDir = 'templates/foundation';

        reporter.generate(options);
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
    
    this.Then(/^he choose "([^"]*)" output as one of the formatter$/, function(arg1, callback) {
        callback();
    });

    this.Then(/^the output should contain test results in HTML format$/, function(callback) {
        callback();
    });

    this.Then(/^Fred runs a failing cucumber scenario$/, function(callback) {
        callback();
    });

    this.Then(/^a failing scenario captures a screenshot$/, function(callback) {
        this.scenario.attach(new Buffer('').toString('base64'), 'image/png');
        callback();
    });

    this.Then(/^the output should contain test results with screenshot in HTML format$/, function(callback) {
        callback();
    });

    this.Then(/^he left one of the step as a pending$/, function(callback) {
        callback();
    });

    this.Then(/^the output should contain the pending test in the HTML pie chart$/, function(callback) {
        callback(null, 'pending');
    });

    this.Then(/^the output should contain the skipped steps in the HTML pie chart$/, function(callback) {
        callback();
    });

    this.Then(/^Fred attaches the "([^"]*)" to the Given step of passing cucumber scenario$/, function(testData, callback) {
        this.scenario.attach(testData);
        callback();
    });

    this.Then(/^the output should contain test data attached to the Given step in HTML format$/, function(callback) {
        callback();
    });

    this.Given(/^Fred runs a passing scenario for the following data set$/, function (table, callback) {
        // Write code here that turns the phrase above into concrete actions
        callback();
    });

    this.Then(/^the output should contain data table attached in HTML format$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback();
    });
};


module.exports = stepDefs;
