var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

exports.serveAssets = function(res, asset, path, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...), css, or anything that doesn't change often.)
 
  var assetName = path+asset;
  console.log("[serveAssets]: asset: ", assetName);
  fs.readFile(assetName, function(error, data){
    if(error){
      // fixme: download only if a valid web address
      console.log("[serveAssets]: Cannot open file, " + assetName + error);
      // archive.downloadUrls(assetName);
      callback(false);
    }
    callback(data);
  });
};

// As you progress, keep thinking about what helper functions you can put here!
exports.collectData = function(request, callback){
  var body = '';
  request.on('data', function(chunk) {
    body += chunk;
    if(body.length > 10000) {
      request.connection.destroy();
    }
  });
  request.on('end', function(){
    callback(body);
  });
};

exports.sendResponse = function(response, message, statusCode){
  var code = statusCode || 200;
  response.writeHead(code, headers);
  response.end(message);
};

exports.isValidFile = function(url, callback){
  // var pathToUrl = exports.paths['archivedSites'] + url.pathname;
  fs.readFile(url, function(err, data){
    if (err){
      console.log('Cannot open file');
      callback(false);
    } 
    else {
      console.log('File already Archived');
      callback(true);
    }
  });
};
