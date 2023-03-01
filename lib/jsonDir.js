// 'use strict';
const jsonFile = require('jsonfile');
const find = require('find');
const path = require('path');

const collectJSONS = function (options) {
    const jsonOutput = [];
    const featureCollection = new Map();
    let files;

    try {
        files = find.fileSync(/\.json$/, options.jsonDir);
    } catch (e) {
        throw new Error('\'options.jsonDir\' does not exist. ' + e);
    }

    if (files.length === 0) throw new Error('No JSON files found under \'options.jsonDir\': ' + options.jsonDir);

    function mergeJSONS(file) {
        let cucumberJson = jsonFile.readFileSync(file);

        function trackScenarioRetries(scenarios) {
            // HACK: Very brittle. Will track if cucumber json file name is not in format command.1.1.log.json
            let basename = path.basename(file, ".log.json");
            let retried = basename.split(".")[2] ?? "0";
            retried = parseInt(retried);
            scenarios.forEach( (scenario) => {
                scenario["retried"] = retried;
            });
        }
        
        function collect(json) {
            trackScenarioRetries(json["elements"] ?? []);
            let featureKey = json["uri"] ?? "Feature: URI Not Present";
            if (featureCollection.has(featureKey)) {
                const featureItem = featureCollection.get(featureKey);
                const elements = featureItem["elements"] ?? [];
                elements.push(...(json["elements"] ?? []));
                featureItem["elements"] = elements;
                featureCollection.set(featureKey, featureItem);
            } else {
                featureCollection.set(featureKey, json);
            }
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
                const timestamp = featureItem["elements"][0]["steps"][0]["output"][0];
                featureItem["timestamp"] = Date.parse(timestamp.match(/[0-9]{4}-.+:[0-9]{2}/g));
            }
        }
        return featureItem;
    }

    files.map(mergeJSONS);

    featureCollection.forEach( (feature, _) => {
        jsonOutput.push(feature);
    });

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
