'use strict';

const Before = require('cucumber').Before;
const After = require('cucumber').After;

const chalk = require('chalk');

Before(function (scenario, callback) {
    console.log( '\n' + chalk.blue.bgYellow.bold('TESTING: ') + chalk.white.bgBlue.bold(' console.log() should not break the report'));
    this.scenario = scenario;
    callback();
});

Before({tags: '@testPassing'}, function (scenario, callback) {
    this.attach('Tests INFO will print here.' +
        '<br>To attach INFO to Any steps, use scenario.attach function in your step definitions as shown below.' +
        '<br><br>If you pass HTML\'s to scenario.attach then reporter will format accordingly <br>' +
        '<br>Simple String  : scenario.attach(\'sample data\')' +
        '<br>Pretty JSON    : scenario.attach(JSON.stringify(json, null, 2))' +
        '<br>HTML Link      : scenario.attach(\'format the link with html-a tag\'');

    this.attach('some text');
    callback();
});

After({tags: '@testPassing'}, function (scenario, callback) {
    callback();
});
