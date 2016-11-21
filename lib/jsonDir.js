'use strict';

var jsonFile = require('jsonfile');
var find = require('find');

var collectJSONS = function(options) {
    var jsonOutput = [];
    var files;

    try {
        files = find.fileSync(/\.json$/, options.jsonDir);
    } catch (e) {
        throw new Error('\'options.jsonDir\' does not exist. ' + e);
    }

    if (files.length === 0) throw new Error('No JSON files found under \'options.jsonDir\': ' + options.jsonDir);

    function mergeJSONS(file) {
        var cucumberJson = jsonFile.readFileSync(file);

        function collect(json) {
            jsonOutput.push(json);
        }

        if ((!cucumberJson || typeof cucumberJson[0] === 'undefined') && !options.ignoreBadJsonFile) {
            throw new Error('Invalid Cucumber JSON file found under ' + options.jsonDir + ': ' + file);
        } else if ((!cucumberJson || typeof cucumberJson[0] === 'undefined') && options.ignoreBadJsonFile) {
            console.log('Invalid Cucumber JSON file found under ' + options.jsonDir + ': ' + file);
        }
        else {
            cucumberJson.map(collect)
        }
    }

    files.map(mergeJSONS);

    jsonFile.writeFileSync(options.output + '.json', jsonOutput, {spaces: 2});

    return jsonOutput;
};

module.exports = {
    collectJSONS: collectJSONS
};
