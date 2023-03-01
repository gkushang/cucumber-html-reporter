### 6.0.0 (Mar-02-2023)
* upgraded to be compatible with cucumber v8.9.1
* upgraded all other dependencies to their latest versions


### 5.1.0 (Dec-15-2019)

* Bootstrap theme filters [#198](https://github.com/gkushang/cucumber-html-reporter/pull/198) by [@srbarrios](https://github.com/srbarrios/)
* Fix duplicate hierarchy names [#200](https://github.com/gkushang/cucumber-html-reporter/pull/200) by [@davestaab](https://github.com/davestaab/)
* Bug fix for issue #163, generate report for cucumber_report_{random_num}.json [#210](https://github.com/gkushang/cucumber-html-reporter/pull/210) by [@hujunhaorobert](https://github.com/hujunhaorobert/)
* Fix for "exit immediate after opening the browser #173" [#205](https://github.com/gkushang/cucumber-html-reporter/pull/205) by [@ErikGrigoriev](https://github.com/ErikGrigoriev/)

### 5.0.2 (Sept-03-2019)

* Quick fix the Chalk dependency - move from devDependencies to dependencies
 
### 5.0.1 (Sept-02-2019)

* Remove duplicate check condition PR#189 by [@ncounter](https://github.com/ncounter/)
* Scenario timestamp and notes PR#190 by [@ncounter](https://github.com/ncounter/)
* Fixed regression of 4.0.4, fixes ISSUE#160 PR#191 [@eiszfuchs](https://github.com/eiszfuchs/cucumber-html-reporter/tree/patch-notdefined)
* Bump lodash from 4.17.11 to 4.17.13 PR#193 by dependabot
* Bump diff from 3.4.0 to 3.5.0 PR#194 by dependabot
* Removed Deprecated, Update dependencies

### 5.0.0 (Apr-16-2019)

* Fix data tables not being read in - [PR#172](https://github.com/gkushang/cucumber-html-reporter/pull/172)
* Update bootstrap to last 3.x stable version - [PR#170](https://github.com/gkushang/cucumber-html-reporter/pull/170)
* Check if embeddings are base64 encoded (even `text/plain`)  - [PR#164](https://github.com/gkushang/cucumber-html-reporter/pull/164)

### 4.0.3 (Feb-21-2019)

* Enable non-inlined screenshots . Fix for [Issue#145](https://github.com/gkushang/cucumber-html-reporter/issues/145) - [PR#166](https://github.com/gkushang/cucumber-html-reporter/pull/166)

### 4.0.4

### 4.0.3 (Aug-23-2018)

* Cannot generate report due an error with Trim() - [PR#125](https://github.com/gkushang/cucumber-html-reporter/pull/125)
* if to switch statement change #155 - [PR#155](https://github.com/gkushang/cucumber-html-reporter/pull/155)


### 4.0.2 (Feb-26-2018)

* Add support for configuring callback - [PR#135](https://github.com/gkushang/cucumber-html-reporter/pull/135)

### 4.0.1 (Feb-06-2018)

* Support to attach Video files as `text/html` to the report - [PR#132](https://github.com/gkushang/cucumber-html-reporter/pull/132)

### 4.0.0 (Feb-02-2018)

* Support for Cucumber 4. Duration is now in Nanoseconds.
* Fix issue: [#130](https://github.com/gkushang/cucumber-html-reporter/issues/130)

### 3.0.4 (Sep-20-2017)

* Fix for Cucumber V2, mime_type

### 3.0.3 (Sep-20-2017)

* Update outdated dependencies [PR#115](https://github.com/gkushang/cucumber-html-reporter/pull/115)

### 3.0.2 (Sep-20-2017)

* Add Backward compatibility for Cucumber V2 and V3. Add styling to Keywords GWT on HTML Report [PR#114](https://github.com/gkushang/cucumber-html-reporter/pull/114)


### 3.0.1 (Aug-23-2017)

* Feature: update to simple theme report [PR#106](https://github.com/gkushang/cucumber-html-reporter/pull/106)
* Fix issues: [#101](https://github.com/gkushang/cucumber-html-reporter/issues/101), [#98](https://github.com/gkushang/cucumber-html-reporter/issues/98)


### 3.0.0 (Aug-22-2017)

* Support for Cucumber 3 [PR#104](https://github.com/gkushang/cucumber-html-reporter/pull/104)
* Use `cucumber-html-reporter@2.0.3` for < Cucumber@3

### 2.0.3 (Jul-17-2017)

* Escape HTML on step name & fix <p> and <div> order for block 'scenario-container' [PR#97](https://github.com/gkushang/cucumber-html-reporter/pull/97). Resolve Issue [#52](https://github.com/gkushang/cucumber-html-reporter/issues/52)


### 2.0.2 (Jul-10-2017)

* Support scoped packages [PR#93](https://github.com/gkushang/cucumber-html-reporter/pull/93)

* Fix issue[#85](https://github.com/gkushang/cucumber-html-reporter/issues/85) with Screenshot attachments with Selenium 3 & Cucumber 2 [PR#95](https://github.com/gkushang/cucumber-html-reporter/pull/95)


### 2.0.1 (Jul-07-2017)

* Save screenshots into custom directory [PR#88](https://github.com/gkushang/cucumber-html-reporter/pull/88)

* Added support for JSON attachments [PR#89](https://github.com/gkushang/cucumber-html-reporter/pull/89)

        Based on MIME type of the attachment. Payload is expected to be base64-encoded (this is based on the existing behaviour of the Cucumber Reports plugin for Jenkins).

* Add tests for Save Screenshots & refactor [PR#91](https://github.com/gkushang/cucumber-html-reporter/pull/91)


### 2.0.0 (Jun-09-2017)

##### Support for Cucumber 2

* Cucumber 2 [PR#81](https://github.com/gkushang/cucumber-html-reporter/pull/81). Resolves Issues [#73](https://github.com/gkushang/cucumber-html-reporter/issues/73),[#72](https://github.com/gkushang/cucumber-html-reporter/issues/72), [#61](https://github.com/gkushang/cucumber-html-reporter/issues/61), [#55](https://github.com/gkushang/cucumber-html-reporter/issues/55)
    * Duration is reported as Milliseconds
    * Attachments are now plain text without encoding
    * DRY the templates and HTML scripts
    * Run Travis-CI with Node@7
    * Disable the Strict mode to test pending/undefined steps scenarios

* Use `cucumber-html-reporter@0.5.0` for < Cucumber@2

### 0.5.0 (Jun-01-2017)

##### Enhancement

* Introducing new Template `Hierarchy` from the [Proposal](https://github.com/gkushang/cucumber-html-reporter/issues/75), [PR#76](https://github.com/gkushang/cucumber-html-reporter/pull/76) & [PR#77](https://github.com/gkushang/cucumber-html-reporter/pull/77)
    * The idea is to render features under respective folder hierarchy. Best case when your features are organized under feature-folders.
* Enhance the Step Duration. Instead of 0s, show 1ms.
* Backward compatible


### 0.4.2 (Apr-27-2017)

##### Fix

* Fix to show '0s' if timestamp is in nanoseconds


### 0.4.1 (Apr-27-2017)

##### Enhancement

* Add `brandTitle` to display on report. Checkout README for more details.

##### Fix

* Step duration time in html report always shows 0s [Issue#61](https://github.com/gkushang/cucumber-html-reporter/issues/61) [PR#62](https://github.com/gkushang/cucumber-html-reporter/pull/62)
* Should not count Before/After hooks if they are hidden [Issue#63](https://github.com/gkushang/cucumber-html-reporter/issues/63) [PR#64](https://github.com/gkushang/cucumber-html-reporter/pull/64)


### 0.4.0 (Mar-24-2017)

* Supports Node versions >0.12

##### Revert the change

* Use fs-extra [PR#59](https://github.com/gkushang/cucumber-html-reporter/pull/59)


### 0.3.9 (Mar-24-2017)

* Supports Node versions <0.12

##### Fix

* Remove support for fs-extra for backward compatibility to support Node versions <0.12


### 0.3.8 (Mar-23-2017)

##### Fix

* Use fs-extra instead of node-fs [PR#50](https://github.com/gkushang/cucumber-html-reporter/pull/50)
* Make chai a dev dependency [PR#51](https://github.com/gkushang/cucumber-html-reporter/pull/51)
* Bootstrap template fixes [PR#56](https://github.com/gkushang/cucumber-html-reporter/pull/56)
* Fix Travis CI [PR#57](https://github.com/gkushang/cucumber-html-reporter/pull/57)


### 0.3.7 (Dec-06-2016)

##### Fix

* Sanitize Screenshot filename [Issue#45](https://github.com/gkushang/cucumber-html-reporter/issues/45) [PR#46](https://github.com/gkushang/cucumber-html-reporter/pull/46)


### 0.3.6 (Dec-06-2016)

##### Fix

* Failure in Before hook should fail the Feature/Scenario, Add slice to rest of the scenario pie charts [PR#44](https://github.com/gkushang/cucumber-html-reporter/pull/44)


### 0.3.5 (Nov-29-2016)

##### Enhancements

* Colors
 * Making labels & colors consistent on report [PR#42](https://github.com/gkushang/cucumber-html-reporter/pull/42)


### 0.3.4 (Nov-28-2016)

##### Enhancements

* Step Duration
 * light gray the step duration to distinguish from the GWT Step description


### 0.3.3 (Nov-28-2016)

##### Enhancements

* Ambiguous Steps
 * show ambiguous status on the pie-chart, features, scenarios and at steps level [PR#40](https://github.com/gkushang/cucumber-html-reporter/pull/40)


### 0.3.2 (Nov-21-2016)

##### Enhancements

* Show Metadata
 * additional info about your test environment, browser, platform, app version, mode of execution, stage, and so on. [PR#39](https://github.com/gkushang/cucumber-html-reporter/pull/39)


### 0.3.1 (Nov-18-2016)

##### Enhancements

* Adding latest Previews to the readme for all themes
* Add more snapshots for the user's review

### 0.3.0 (Nov-18-2016)

* Deprecate Store Screenshots
 * Deprecate the option to store screenshot to the disk by default. If you still want to Store a screenShot to the directory, you can pass an option `storeScreenShots` to the reporter.

##### Enhancements

* Inline Screenshots
 * Add support for inline png screenshots, fix package.json lookup, Fix success log: [PR#32](https://github.com/gkushang/cucumber-html-reporter/pull/32)
* For backward compatibility, adds an option to store screenshot to a directory: [PR#38](https://github.com/gkushang/cucumber-html-reporter/pull/38)


##### `storeScreenShots`
Type: `Boolean`
Default: `undefined`

`true`: Stores all screenShots stores the screenShots to the default directory. It creates a directory 'screehshot' if does not exists.
`false` or `undefined` : Does not store screenShots but attaches screenShots as a step-inline images to HTML report

##### Fixes

* Fixes [ISSUE#29](https://github.com/gkushang/cucumber-html-reporter/issues/29)


### 0.2.17 (Nov-17-2016)

##### Enhancements

* Tags on Report
 * Display Tags on Feature & Scenarios: [PR#35](https://github.com/gkushang/cucumber-html-reporter/pull/35)
* Filter Repeated Tags
 * Filter Tags from Scenarios which is already displayed at Feature Level & add some styling to Tags [PR#37](https://github.com/gkushang/cucumber-html-reporter/pull/37)


### 0.2.16 (Oct-07-2016)

##### Enhancements

* Scenario Description
 * Show Scenario Description on HTML report: [ISSUE#33](https://github.com/gkushang/cucumber-html-reporter/issues/33)


### 0.2.15 (Sep-28-2016)

##### Fix

* Fix for older node versions: [ISSUE#30](https://github.com/gkushang/cucumber-html-reporter/issues/30)


### 0.2.14 (Sep-27-2016)

##### Enhancements

* Option to add custom name to the project & adds footer: [PR#28](https://github.com/gkushang/cucumber-html-reporter/pull/28)


### 0.2.13 (Sep-27-2016)

##### Enhancements

* Show time taken by each steps to complete the execution on report: [PR#17](https://github.com/gkushang/cucumber-html-reporter/pull/17) & [PR#27](https://github.com/gkushang/cucumber-html-reporter/pull/27)


### 0.2.12 (Sep-27-2016)

##### Fixes

* Show hidden hooks if they fail: [PR#25](https://github.com/gkushang/cucumber-html-reporter/pull/25)


### 0.2.11 (Sep-26-2016)

##### Fixes

* Fix typo on README: [PR#22](https://github.com/gkushang/cucumber-html-reporter/pull/22)

* Fix Foundation template for local: [PR#23](https://github.com/gkushang/cucumber-html-reporter/pull/23)


### 0.2.10 (Sep-22-2016)

##### Enhancements

* Conditionally hide hidden steps from the report: [PR#20](https://github.com/gkushang/cucumber-html-reporter/pull/20)

    * After & Before hooks are hidden on Cucumber JSON file. They will be visible on the report only if it has Info or Screenshot attached to it.


### 0.2.9 (Sep-08-2016)

##### Enhancements

* Ignore the bad JSON files when consolidating from the JSON Directory: [PR#13](https://github.com/gkushang/cucumber-html-reporter/pull/13)

    * Set the option `ignoreBadJsonFile` to `true` as a boolean to ignore the Bad JSON files


##### BugFix

* Fixed the issue when report was breaking with the Cucumber's Doc String: [Issue#14](https://github.com/gkushang/cucumber-html-reporter/issues/14)


### 0.2.8 (Aug-30-2016)

##### Enhancements

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

### 0.2.7 (Aug-16-2016)

##### Enhancements

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


### 0.2.6 (Jul-29-2016)

##### BugFix

* Fixed the issue where Error messages were not printing on the report.

### 0.2.5 (Jul-28-2016)

##### Enhancements

* trim the text to be printed on report

### 0.2.4 (Jul-28-2016)

##### BugFix

* https://github.com/mavdi/grunt-cucumberjs/issues/86

### 0.2.3 (Jul-26-2016)

##### Enhancements

* Published https://github.com/gkushang/cucumber-html-reporter/pull/10 Set charset as utf-8

### 0.2.2 (Jul-21-2016)

##### BugFix

* Fixes https://github.com/gkushang/cucumber-html-reporter/issues/7

### 0.2.1 (Jul-12-2016)

##### Enhancements

* Recursively create HTML report directory if does not exists
* Remove outdated chai-fs depedency and use chai-should assertions
* Lighter the background color or Scenario attachments


### 0.2.0 (Jul-10-2016)

##### Support for Cucumber@1.2.0 version

* Screenshot attachment support for Cucumber release >= @1.2.0 (https://github.com/cucumber/cucumber-js/blob/master/CHANGELOG.md#bug-fixes-1)


### 0.1.6 (Jul-07-2016)

##### Enhancements

* Format feature descriptions on report
* Add overflow scroll bar for the bigger data-table
* print error messaged in the pre


### 0.1.5 (Jul-05-2016)

##### Enhancements

* Show feature description on report

* Updated README

##### Bug fixes

* Fix bug when cucumber error message has kind of html tags as a string, e.g. <object> is not defined.


### 0.1.4 (Jun-28-2016)

##### Enhancements

* Using `path` instead of separators to make platform agnostic

* Updated tests `hooks`

* README updated with the instructions on how to integrate reporter to the cucumber hooks


### 0.1.3 (Jun-27-2016)

##### Bug fixes

* Fixed a bug in template path

* README updated


### 0.1.1 (Jun-27-2016)

##### New Features

* Tooltip for Scenarios or Features in the HEADER based on reportSuiteAsScenarios flag

* Add an optional `callback` for the `generate(options, callback)` function

* Report `pending` steps in scenarios for bootstrap & foundation themes

* Refactored and added more tests & validations
