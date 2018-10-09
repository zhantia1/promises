/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
var { getGitHubProfileAsync } = require('./promisification.js');
var { pluckFirstLineFromFileAsync } = require('./promiseConstructor.js');
//var writeFileAsync = Promise.promisify(fs.writeFile);

var writeFileAsync = function(writeFilePath, text) {
  return new Promise(function(resolve, reject) {
    var stringifiedText = JSON.stringify(text);
    fs.writeFile(writeFilePath, stringifiedText, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(text);
      }
    });
  }); 
};

var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  // TODO
  return pluckFirstLineFromFileAsync(readFilePath)
    .then(function(user) {
      return getGitHubProfileAsync(user); 
    })
    .then(function(response) {
      console.log(typeof response);
      return writeFileAsync(writeFilePath, response);
    });
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
