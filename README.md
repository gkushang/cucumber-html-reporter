cucumber-html-reporter
======================

[![Build Status](https://travis-ci.org/gkushang/cucumber-html-reporter.svg?branch=develop)](https://travis-ci.org/gkushang/cucumber-html-reporter)

Generate Cucumber HTML reports with pie charts
> Available HTML themes: `['bootstrap', 'foundation', 'simple']`


## Preview of HTML Reports

1. [Bootstrap Theme Reports with Pie Chart][3]
2. [Foundation Theme Reports][4]
3. [Simple Theme Reports][5]


## Snapshot of Bootstrap Report
![Alt text](/test/report/cucumber_report_bootstrap_snapshot.png "Snapshot - Bootstrap Report")


## Install

``` bash
npm install cucumber-html-reporter --save-dev
```

## Usage

Example of `bootstrap` theme:

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


> Plugin the above code to the cucumber's `AfterFeatures` hook as shown in [test/features/step_definitions/hooks][7] and pick the theme you are interested in.

> This module converts Cucumber's JSON format to HTML reports. In order to generate JSON formats, run the Cucumber to create the JSON format and pass the file name to the formatter as shown below,

```
$ cucumberjs test/features/ -f json:test/report/cucumber_report.json
```

> Multiple formatter are also supported, 

```
$ cucumberjs test/features/ -f pretty -f json:test/report/cucumber_report.json
```

> Are you using cucumber with other frameworks or running [cucumber-parallel][6]? Pass relative path of JSON file to the `options` as shown [here][7]

 
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

Credit to the developers of [grunt-cucumberjs][1] for developing pretty HTML reporting. HTML reporting is extracted from the grunt task. Thanks to all the contributors for making HTML Reporting available to the wider audiences of [cucumber-js][2] community.

[1]: https://www.npmjs.com/package/grunt-cucumberjs "grunt-cucummberjs"
[2]: https://github.com/cucumber/cucumber-js "CucumberJs"
[3]: http://htmlpreview.github.io/?https://github.com/gkushang/grunt-cucumberjs/blob/cucumber-reports/test/cucumber-reports/cucumber-report-bootstrap.html "Bootstrap Theme Reports"
[4]: http://htmlpreview.github.io/?https://github.com/gkushang/grunt-cucumberjs/blob/cucumber-reports/test/cucumber-reports/cucumber-report-foundation.html "Foundation Theme Reports"
[5]: http://htmlpreview.github.io/?https://github.com/gkushang/grunt-cucumberjs/blob/cucumber-reports/test/cucumber-reports/cucumber-report-simple.html "Simple Theme Reports"
[6]: https://www.npmjs.com/package/cucumber-parallel "cucumber-parallel"
[7]: https://github.com/gkushang/cucumber-html-reporter/blob/develop/test/features/step_definitions/hooks.js#L13-L44

