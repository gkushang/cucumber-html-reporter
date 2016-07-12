'use strict';
var chai = require('chai');
var fs = require('fs');
should = chai.should();
var path = require('path');

module.exports = function assertHtmlReports(outputDirectory) {

    function isReportExists(report) {
        try {
            return fs.statSync(report).isFile();
        } catch (e) {
            return false
        }
    }

    var bootstrapHtmlFile = path.join(outputDirectory, 'cucumber_report_bootstrap.html');
    var foundationHtmlFile = path.join(outputDirectory, 'cucumber_report_foundation.html');
    var simpleHtmlFile = path.join(outputDirectory, 'cucumber_report_simple.html');

    isReportExists(bootstrapHtmlFile).should.be.equal(true, 'bootstrapHtmlFile file \'' + bootstrapHtmlFile + '\' does not exist');
    isReportExists(foundationHtmlFile).should.be.equal(true, 'foundationHtmlFile file \'' + foundationHtmlFile + '\' does not exist');
    isReportExists(simpleHtmlFile).should.be.equal(true, 'simpleHtmlFile file \'' + simpleHtmlFile + '\' does not exist');
};