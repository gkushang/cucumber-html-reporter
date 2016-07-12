'use strict';

var stepDefs = function stepDefs() {

    this.Then(/^this feature runs with background$/, function(callback) {
        callback();
    });

    this.Then(/^Fred runs a(?: passing|) cucumber scenario$/, function(callback) {
        callback();
    });

    this.Given(/^Fred runs a passing cucumber scenario on behalf of "([^"]*)"/, function(name, callback) {
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

    this.Then(/^he throws the pending exception from this step$/, function(callback) {
        callback(null, 'pending');
    });

    this.Then(/^cucumber-html-reporter should report pending step with code-snippets in HTML report$/, function(callback) {
        callback();
    });

    this.Then(/^Fred attaches the "([^"]*)" to the Given step of passing cucumber scenario$/, function(testData, callback) {
        this.scenario.attach(testData);

        var myJsonObject = {
            name: 'cucumber-html-reporter',
            format: 'html'
        };

        this.scenario.attach(JSON.stringify(myJsonObject, undefined, 2));

        callback();
    });

    this.Then(/^cucumber-html-reporter should create HTML report/, function(callback) {
        callback();
    });

    this.Given(/^Fred runs a passing scenario for the following data set$/, function(table, callback) {
        // Write code here that turns the phrase above into concrete actions
        callback();
    });

};


module.exports = stepDefs;
