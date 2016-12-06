cucumber-html-reporter
======================

[![Build Status](https://travis-ci.org/gkushang/cucumber-html-reporter.svg?branch=develop)](https://travis-ci.org/gkushang/cucumber-html-reporter) [![v](https://img.shields.io/npm/v/cucumber-html-reporter.svg)](https://www.npmjs.com/package/cucumber-html-reporter)
[![Dependency Status](https://david-dm.org/gkushang/cucumber-html-reporter.svg)](https://david-dm.org/gkushang/cucumber-html-reporter)
[![License](https://img.shields.io/npm/l/cucumber-html-reporter.svg)](LICENSE)


Generate Cucumber HTML reports with pie charts
> Available HTML themes: `['bootstrap', 'foundation', 'simple']`


## Preview of HTML Reports

1. [Bootstrap Theme Reports with Pie Chart][3]
2. [Foundation Theme Reports][4]
3. [Simple Theme Reports][5]


## Snapshot of Bootstrap Report
![Alt text](/samples/html_report_snapshots/cucumber_report_bootstrap_snapshot.png "Snapshot - Bootstrap Report")

###### More snapshots are availble [here][8]


## Install

``` bash
npm install cucumber-html-reporter --save-dev
```

## Usage

Provide Cucumber JSON report file created from your framework and this module will create pretty HTML reports. Choose your best suitable HTML theme and dashboard on your CI with available HTML reporter plugins.

Example of `bootstrap` theme:

``` bash

var reporter = require('cucumber-html-reporter');

var options = {
        theme: 'bootstrap',
        jsonFile: 'test/report/cucumber_report.json',
        output: 'test/report/cucumber_report.html',
        reportSuiteAsScenarios: true,
        launchReport: true,
        metadata: {
            "App Version":"0.3.2",
            "Test Environment": "STAGING",
            "Browser": "Chrome  54.0.2840.98",
            "Platform": "Windows 10",
            "Parallel": "Scenarios",
            "Executed": "Remote"
        }
    };

    reporter.generate(options);
    
    
    
    //more info on `metadata` is available in `options` section below.

    //to generate consodilated report from multi-cucumber JSON files, please use `jsonDir` option instead of `jsonFile`. More info is available in `options` section below.

```

> Please look at the `options` section below for more options

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

#### `jsonDir`
Type: `String`

If you have more than one cucumber JSON files, provide the path of JSON directory. This module will create consolidated report of all Cucumber JSON files.

e.g. `jsonDir: 'test/reports'` //where _reports_ directory contains valid `*.json` files


N.B.: `jsonFile` takes precedence over `jsonDir`. We recommend to use either `jsonFile` or `jsonDir` option.


#### `output`
Type: `String`

Provide HTML output file path and name


#### `reportSuiteAsScenarios`
Type: `Boolean`
Supported in the Bootstrap theme.

`true`: Reports total number of passed/failed scenarios as HEADER.

`false`: Reports total number of passed/failed features as HEADER.

#### `launchReport`
Type: `Boolean`

Automatically launch HTML report at the end of test suite

`true`: Launch HTML report in the default browser

`false`: Do not launch HTML report at the end of test suite

#### `ignoreBadJsonFile`
Type: `Boolean`

Report any bad json files found during merging json files from directory option.

`true`: ignore any bad json files found and continue with remaining files to merge.

`false`: Default option. Fail report generation if any bad files found during merge.

#### `name`
Type: `String` (optional)

Custom project name. If not passed, module reads the name from projects package.json which is preferable.
 
#### `storeScreenShots`
Type: `Boolean`
Default: `undefined`

`true`: Stores the screenShots to the default directory. It creates a directory 'screehshot' if does not exists.

`false` or `undefined` : Does not store screenShots but attaches screenShots as a step-inline images to HTML report


#### `metadata`
Type: `JSON` (optional)
Default: `undefined`

Print more data to your report, such as _browser info, platform, app info, environments_ etc. Data can be passed as JSON `key-value` pair. Reporter will parse the JSON and will show the _Key-Value_ under `Metadata` section on HTML report. Checkout the below preview HTML Report with Metadata.

Pass the _Key-Value_ pair as per your need, as shown in below example,

```json

 metadata: {
        "App Version":"0.3.2",
        "Test Environment": "STAGING",
        "Browser": "Chrome  54.0.2840.98",
        "Platform": "Windows 10",
        "Parallel": "Scenarios",
        "Executed": "Remote"
      }
      
```

* [HTML Report Preview with Metadata][3]
* [Report Snapshot with Metadata][10]


## Tips

#### Attach Screenshots to HTML report

Capture and Attach screenshots to the Cucumber Scenario and HTML report will render the screenshot image

```javascript

  driver.takeScreenshot().then(function (buffer) {
    return scenario.attach(new Buffer(buffer, 'base64'), 'image/png');
  }

```

#### Attach Plain Text to HTML report

Attach plain-texts/data to HTML report to help debug/review the results

```javascript

  scenario.attach('test data goes here');

```

#### Attach pretty JSON to HTML report

Attach JSON to HTML report

```javascript

  scenario.attach(JSON.stringify(myJsonObject, undefined, 4));

```

## Changelog

[changelog][9]


## Credits

Credit to the developers of [grunt-cucumberjs][1] for developing pretty HTML reporting. HTML reporting is extracted from the grunt task. Thanks to all the contributors for making HTML Reporting available to the wider audiences of [cucumber-js][2] community.

[1]: https://www.npmjs.com/package/grunt-cucumberjs "grunt-cucummberjs"
[2]: https://github.com/cucumber/cucumber-js "CucumberJs"
[3]: http://htmlpreview.github.io/?https://github.com/gkushang/cucumber-html-reporter/blob/develop/samples/html_reports/cucumber_report_bootstrap.html "Bootstrap Theme Reports"
[4]: http://htmlpreview.github.io/?https://github.com/gkushang/cucumber-html-reporter/blob/develop/samples/html_reports/cucumber_report_foundation.html "Foundation Theme Reports"
[5]: http://htmlpreview.github.io/?https://github.com/gkushang/cucumber-html-reporter/blob/develop/samples/html_reports/cucumber_report_simple.html "Simple Theme Reports"
[6]: https://www.npmjs.com/package/cucumber-parallel "cucumber-parallel"
[7]: https://github.com/gkushang/cucumber-html-reporter/blob/develop/test/features/step_definitions/hooks.js#L13-L44
[8]: https://github.com/gkushang/cucumber-html-reporter/blob/develop/samples/snapshots.md
[9]: https://github.com/gkushang/cucumber-html-reporter/blob/develop/CHANGELOG.md
[10]: https://github.com/gkushang/cucumber-html-reporter/blob/develop/samples/snapshots.md#with-metadata


