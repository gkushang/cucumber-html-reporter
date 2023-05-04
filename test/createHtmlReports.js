const path = require('path');
const fs = require('fs-extra');
const find = require('find');
const reporter = require('../index.js');
const assertHtmlReports = require('./assert/assertHtmlReports');

let theme = {
  hierarchy: 'hierarchy',
  bootstrap: 'bootstrap',
  foundation: 'foundation',
  simple: 'simple',
};

let outputDirectory = 'test/report';
let jsonFile = 'test/report/cucumber_report.json';
let jsonDir = 'test/report/multi';

function removeReports() {
  let files = find.fileSync(/\.html/, outputDirectory);
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
    // TODO: change launchReport back to 'true' before final merge
    launchReport: false,
    storeScreenshots: true,
    screenshotsDirectory: 'screenshots/',
    metadata: {
      'App Version': '0.3.2',
      'Test Environment': 'STAGING',
      Browser: 'Chrome  54.0.2840.98',
      Platform: 'Windows 10',
      Parallel: 'Scenarios',
      Executed: 'Remote',
    },
    failedSummaryReport: true,
  };
}

function getJsonFileOptions(theme) {
  let options = getOptions(theme);
  options.jsonFile = jsonFile;
  return options;
}

function getJsonDirOptions(theme) {
  let options = getOptions(theme);
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
