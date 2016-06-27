'use strict';
var chai = require('chai');
chai.use(require('chai-fs'));
var expect = chai.expect;

module.exports = function assertHtmlReports() {

    var bootstrapHtmlFile = 'test/report/cucumber_report_bootstrap.html';
    var foundationHtmlFile = 'test/report/cucumber_report_foundation.html';
    var simpleHtmlFile = 'test/report/cucumber_report_simple.html';

    expect(bootstrapHtmlFile).to.be.a.path('Bootstrap HTML report was not created');
    expect(foundationHtmlFile).to.be.a.path('Foundation HTML report was not created');
    expect(simpleHtmlFile).to.be.a.path('Simple HTML report was not created');
};