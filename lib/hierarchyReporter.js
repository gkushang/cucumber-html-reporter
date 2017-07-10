'use strict';

var _ = require('lodash');
var path = require('path');

/**
 * hierarchyReporter.js
 *
 * Support for hierarchy report template
 * These functions will always be called,
 * but they will be harmlessly ignored by other report types
 */

/**
 * Review each feature in the suite, and find the common baseDir that is shared by all of them.
 * We will later use this as the basis from which to construct the feature hierarchy--
 * the basedir prefix needs to be removed since it is not important.
 */
var getBaseDir = function (suite) {
    var baseDir = [];
    suite.features.forEach(function (feature) {
        var uriParts = feature.uri.split(path.sep);
        if (!baseDir.length) {
            baseDir = uriParts;
        } else {
            for (var i = uriParts.length; i > 0; i--) {
                if ((baseDir.length > i) && (baseDir[i] !== uriParts[i])) {
                    baseDir.length = i;
                }
            }
        }
    });
    return baseDir.join(path.sep);
};

/**
 * Given a feature, remove the basedir prefix and the feature name suffix from its URI
 * and return the remaining folders (if any) in an array.  If the feature is at the top-level,
 * it will return []
 * For example:
 * @param featureUri:  '/home/cstrong/myproj/test/features/authentication/login/guestLogin.feature'
 * @param baseDir:  '/home/cstrong/myproj/test/features'
 * @returns [ 'authentication', 'login' ]
 */
var getFeatureHierarchy = function (featureUri, baseDir) {
    var noBaseDir = featureUri.slice(baseDir.length + 1);
    var noBadChars = noBaseDir.split('=').join('_');
    var featureDirs = noBadChars.split(path.sep);

    // remove the feature name itself
    featureDirs.length = featureDirs.length - 1;

    return featureDirs;
};

/**
 * Given the top-level suite and the hierarchy to build, recursively create the hierarchy
 * of sub-suites (if needed) and return the lowest level sub-suite.
 *
 * @param suite
 * @param hierarchy  e.g. [ 'authentication', 'login' ]
 * @returns suite object or null if there is no hierarchy
 */
var findOrCreateSubSuite = function (suite, hierarchy) {

    /*
     Create a new sub-suite correspond to a folder name.  The suite will contain the features that are defined
     within that folder, and/or sub-suites corresponding to any sub-folders that themselves may contain features.
     A sub-suite has a reference to its parent suite, so that we can easily aggregate statistics of passed and failed
     tests up the hierarchy.
     */
    function newSubSuite(name, parent) {
        return {
            name: {
                plain: name,
                sanitized: name
            },
            passed: 0,
            failed: 0,
            ambiguous: 0,
            parent: parent,
            features: [],
            suites: []
        };
    }

    if (hierarchy.length < 1) {
        return null;
    }
    var subSuiteName = hierarchy[0];
    if (!suite.suites) {
        suite.suites = [];
    }
    var subSuite = suite.suites.find(function (s) {
        return s.name.plain === subSuiteName;
    });
    if (!subSuite) {
        subSuite = newSubSuite(subSuiteName, suite);
        suite.suites.push(subSuite);
    }
    if (hierarchy.length === 1) {
        return subSuite;
    } else {
        return findOrCreateSubSuite(subSuite, hierarchy.slice(1));
    }
};

/**
 * Increment stat such as failed, ambiguous or passed for the current suite
 * and follow the parent attribute (if any) recursively up the tree, incrementing all.
 * That way the top level suite accumulates all results from child and grandchild suites
 *
 * @param subSuite
 * @param attrName ('passed', 'failed', or 'ambiguous')
 */
var recursivelyIncrementStat = function (subSuite, attrName) {
    subSuite[attrName] = subSuite[attrName] + 1;
    if (subSuite.parent) {
        recursivelyIncrementStat(subSuite.parent, attrName);
    }
};

module.exports = {
    getBaseDir: getBaseDir,
    getFeatureHierarchy: getFeatureHierarchy,
    findOrCreateSubSuite: findOrCreateSubSuite,
    recursivelyIncrementStat: recursivelyIncrementStat
};
