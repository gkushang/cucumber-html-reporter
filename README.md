# cucumber-html-reporter
Generate Cucumber HTML reports with pie charts
> Available HTML themes: `['bootstrap', 'foundation', 'simple']`

[![Build Status](https://travis-ci.org/gkushang/cucumber-html-reporter.svg?branch=develop)](https://travis-ci.org/gkushang/cucumber-html-reporter)

## Sample HTML Reports

1. [Bootstrap Theme Reports with Pie Chart][3]
2. [Foundation Theme Reports][4]
3. [Simple Theme Reports][5]

## Install

``` bash
npm install cucumber-html-reporter --save-dev
```

## Usage

Example `bootstrap` theme:

``` bash

var reporter = require('cucumber-html-reporter');

var options = {
        theme: 'bootstrap',
        jsonFile: 'test/report/cucumber_report.json',
        output: 'test/report/cucumber_report.html',
        reportSuiteAsScenarios: true
    };

    reporter.generate(options);
```

## Options

#### `theme`
Available: `['bootstrap', 'foundation', 'simple']`
Type: `String`

Select the Theme for HTML report.


#### `jsonFile`
Type: `String`

Provide path of the Cucumber JSON format file


#### `output`
Type: `String`

Provide HTML output file path and name


#### `reportSuiteAsScenarios`
Type: `Boolean`
Supported in the Bootstrap theme. 

`true`: Reports total number of passed/failed scenarios as HEADER.

`false`: Reports total number of passed/failed features as HEADER.


## Credits

Credit goes to the developers of [grunt-cucumberjs][1] for developing pretty HTML reporting. HTML reporting is extracted from the grunt task. Thanks to all the contributors for making HTML Reporting available to the wider audiences of [cucumber-js][2] community.

[1]: https://www.npmjs.com/package/grunt-cucumberjs "grunt-cucummberjs"
[2]: https://github.com/cucumber/cucumber-js "CucumberJs"
[3]: http://htmlpreview.github.io/?https://github.com/gkushang/grunt-cucumberjs/blob/cucumber-reports/test/cucumber-reports/cucumber-report-bootstrap.html "Bootstrap Theme Reports"
[4]: http://htmlpreview.github.io/?https://github.com/gkushang/grunt-cucumberjs/blob/cucumber-reports/test/cucumber-reports/cucumber-report-foundation.html "Foundation Theme Reports"
[5]: http://htmlpreview.github.io/?https://github.com/gkushang/grunt-cucumberjs/blob/cucumber-reports/test/cucumber-reports/cucumber-report-simple.html "Simple Theme Reports"

