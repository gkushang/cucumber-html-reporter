'use strict';

var jsonFile = require('jsonfile');
var find = require('find');

var collectJSONS = function (options) {
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

    function addTimestamp(featureItem) {
        if (featureItem["elements"] && featureItem["elements"][0] &&
            featureItem["elements"][0]["steps"] && featureItem["elements"][0]["steps"][0] &&
            featureItem["elements"][0]["steps"][0]["output"] && featureItem["elements"][0]["steps"][0]["output"][0]) {

            if (typeof featureItem["elements"][0]["steps"][0]["output"][0] !== 'undefined') {
                var timestamp = featureItem["elements"][0]["steps"][0]["output"][0];
                featureItem["timestamp"] = Date.parse(timestamp.match(/[0-9]{4}-.+:[0-9]{2}/g));
            }
        }
        return featureItem;
    }

    files.map(mergeJSONS);

    jsonOutput.map(addTimestamp);
    if (!jsonOutput.filter(f => !f.timestamp).length) {
        jsonOutput.sort(function (feature, nextFeature) {
            return feature.timestamp - nextFeature.timestamp;
        });
    }

    jsonFile.writeFileSync(options.output + '.json', jsonOutput, {spaces: 2});

    return jsonOutput;
};

module.exports = {
    collectJSONS: collectJSONS
};
