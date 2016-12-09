### 0.3.7 (2016-12-09)

### Fix

* Sanitize Screenshot filename [Issue#45](https://github.com/gkushang/cucumber-html-reporter/issues/45) [PR#46](https://github.com/gkushang/cucumber-html-reporter/pull/46) 


### 0.3.6 (2016-12-06)

### Fix

* Failure in Before hook should fail the Feature/Scenario, Add slice to rest of the scenario pie charts [PR#44](https://github.com/gkushang/cucumber-html-reporter/pull/44) 


### 0.3.5 (2016-11-29)

### Enhancements

* Colors
 * Making labels & colors consistent on report [PR#42](https://github.com/gkushang/cucumber-html-reporter/pull/42) 


### 0.3.4 (2016-11-28)

### Enhancements

* Step Duration
 * light gray the step duration to distinguish from the GWT Step description 


### 0.3.3 (2016-11-28)

### Enhancements

* Ambiguous Steps
 * show ambiguous status on the pie-chart, features, scenarios and at steps level [PR#40](https://github.com/gkushang/cucumber-html-reporter/pull/40)


### 0.3.2 (2016-11-21)

### Enhancements

* Show Metadata
 * additional info about your test environment, browser, platform, app version, mode of execution, stage, and so on. [PR#39](https://github.com/gkushang/cucumber-html-reporter/pull/39)


### 0.3.1 (2016-11-18)

### Enhancements

* Adding latest Previews to the readme for all themes
* Add more snapshots for the user's review

### 0.3.0 (2016-11-18)__

* Deprecate Store Screenshots
 * Deprecate the option to store screenshot to the disk by default. If you still want to Store a screenShot to the directory, you can pass an option `storeScreenShots` to the reporter.

#### Enhancements

* Inline Screenshots
 * Add support for inline png screenshots, fix package.json lookup, Fix success log: [PR#32](https://github.com/gkushang/cucumber-html-reporter/pull/32)
* For backward compatibility, adds an option to store screenshot to a directory: [PR#38](https://github.com/gkushang/cucumber-html-reporter/pull/38)


##### `storeScreenShots`
Type: `Boolean`
Default: `undefined`

`true`: Stores all screenShots stores the screenShots to the default directory. It creates a directory 'screehshot' if does not exists.
`false` or `undefined` : Does not store screenShots but attaches screenShots as a step-inline images to HTML report

#### Fixes

* Fixes [ISSUE#29](https://github.com/gkushang/cucumber-html-reporter/issues/29)


### 0.2.17 (2016-11-17)

#### Enhancements

* Tags on Report
 * Display Tags on Feature & Scenarios: [PR#35](https://github.com/gkushang/cucumber-html-reporter/pull/35)
* Filter Repeated Tags
 * Filter Tags from Scenarios which is already displayed at Feature Level & add some styling to Tags [PR#37](https://github.com/gkushang/cucumber-html-reporter/pull/37)


### 0.2.16 (2016-10-07)

#### Enhancements

* Scenario Description
 * Show Scenario Description on HTML report: [ISSUE#33](https://github.com/gkushang/cucumber-html-reporter/issues/33)


### 0.2.15 (2016-09-28)

#### Fix

* Fix for older node versions: [ISSUE#30](https://github.com/gkushang/cucumber-html-reporter/issues/30)


### 0.2.14 (2016-09-27)

#### Enhancements

* Option to add custom name to the project & adds footer: [PR#28](https://github.com/gkushang/cucumber-html-reporter/pull/28)
  
  
### 0.2.13 (2016-09-27)

#### Enhancements

* Show time taken by each steps to complete the execution on report: [PR#17](https://github.com/gkushang/cucumber-html-reporter/pull/17) & [PR#27](https://github.com/gkushang/cucumber-html-reporter/pull/27)
    

### 0.2.12 (2016-09-27)

#### Fixes

* Show hidden hooks if they fail: [PR#25](https://github.com/gkushang/cucumber-html-reporter/pull/25)


### 0.2.11 (2016-09-26)

#### Fixes

* Fix typo on README: [PR#22](https://github.com/gkushang/cucumber-html-reporter/pull/22)

* Fix Foundation template for local: [PR#23](https://github.com/gkushang/cucumber-html-reporter/pull/23)


### 0.2.10 (2016-09-22)

#### Enhancements

* Conditionally hide hidden steps from the report: [PR#20](https://github.com/gkushang/cucumber-html-reporter/pull/20)

    * After & Before hooks are hidden on Cucumber JSON file. They will be visible on the report only if it has Info or Screenshot attached to it.


### 0.2.9 (2016-09-08)

#### Enhancements

* Ignore the bad JSON files when consolidating from the JSON Directory: [PR#13](https://github.com/gkushang/cucumber-html-reporter/pull/13)

    * Set the option `ignoreBadJsonFile` to `true` as a boolean to ignore the Bad JSON files


#### BugFix

* Fixed the issue when report was breaking with the Cucumber's Doc String: [Issue#14](https://github.com/gkushang/cucumber-html-reporter/issues/14) 


### 0.2.8 (2016-08-30)

#### Enhancements

* Generate consolidated report from multiple JSON files: [PR#12](https://github.com/gkushang/cucumber-html-reporter/pull/12) 

    * Provide the path of `jsonDir` to generate consolidated report,


``` bash

var reporter = require('cucumber-html-reporter');
...
...

var options = {
        theme: 'bootstrap',
        jsonDir: 'test/reports',
        output: 'test/report/cucumber_report.html',
        reportSuiteAsScenarios: true,
        launchReport: true
    };

    reporter.generate(options);
```

### 0.2.7 (2016-08-16)

#### Enhancements

* Launch report automatically after test ends
* Pass a flag `launchReport` to the options


``` bash

var reporter = require('cucumber-html-reporter');
...
...

var options = {
        theme: 'bootstrap',
        jsonFile: 'test/report/cucumber_report.json',
        output: 'test/report/cucumber_report.html',
        reportSuiteAsScenarios: true,
        launchReport: true
    };

    reporter.generate(options);
```


### 0.2.6 (2016-07-29)

#### BugFix

* Fixed the issue where Error messages were not printing on the report. 

### 0.2.5 (2016-07-28)

#### Enhancements

* trim the text to be printed on report 

### 0.2.4 (2016-07-28)

#### BugFix

* https://github.com/mavdi/grunt-cucumberjs/issues/86 

### 0.2.3 (2016-07-26)

#### Enhancements

* Published https://github.com/gkushang/cucumber-html-reporter/pull/10 Set charset as utf-8 

### 0.2.2 (2016-07-21)

#### BugFix

* Fixes https://github.com/gkushang/cucumber-html-reporter/issues/7

### 0.2.1 (2016-07-12)

#### Enhancements

* Recursively create HTML report directory if does not exists
* Remove outdated chai-fs depedency and use chai-should assertions
* Lighter the background color or Scenario attachments
 

### 0.2.0 (2016-07-10)

#### Support for Cucumber@1.2.0 version

* Screenshot attachment support for Cucumber release >= @1.2.0 (https://github.com/cucumber/cucumber-js/blob/master/CHANGELOG.md#bug-fixes-1)
 

### 0.1.6 (2016-07-07)

#### Enhancements

* Format feature descriptions on report 
* Add overflow scroll bar for the bigger data-table
* print error messaged in the pre
 

### 0.1.5 (2016-07-05)

#### Enhancements

* Show feature description on report
 
* Updated README

#### Bug fixes

* Fix bug when cucumber error message has kind of html tags as a string, e.g. <object> is not defined.


### 0.1.4 (2016-06-28)

#### Enhancements

* Using `path` instead of separators to make platform agnostic
 
* Updated tests `hooks`

* README updated with the instructions on how to integrate reporter to the cucumber hooks


### 0.1.3 (2016-06-27)

#### Bug fixes

* Fixed a bug in template path

* README updated


### 0.1.1 (2016-06-27)

#### New Features

* Tooltip for Scenarios or Features in the HEADER based on reportSuiteAsScenarios flag

* Add an optional `callback` for the `generate(options, callback)` function

* Report `pending` steps in scenarios for bootstrap & foundation themes

* Refactored and added more tests & validations
