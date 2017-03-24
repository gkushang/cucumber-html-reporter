'use strict';

var fs = require('fs');
var path = require('path');

function searchFileUp(fileName) {
    var pathParts = process.cwd().split(path.sep);

    var filePath = pathParts.concat([fileName]).join(path.sep);

    while (!exists(filePath) && pathParts.length) {
        pathParts.pop();
        filePath = pathParts.concat([fileName]).join(path.sep);
    }

    return filePath;
}

function exists(filePath) {
    try {
        return fs.statSync(filePath).isFile();
    } catch (err) {
        return false;
    }
}

module.exports = searchFileUp;