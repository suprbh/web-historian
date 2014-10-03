var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelper = require('./http-helpers.js')
// require more modules/folders here!



var exports = module.exports = {};
exports.handleRequest = function (req, res) {
console.log("Serving request type " + req.method + " for url " + req.url );
switch(req.method){
  case 'OPTIONS':
    httpHelper.sendResponse(res, "", 204);
    break;
  case 'GET':
    console.log("Here GET");
      httpHelper.serveAssets(res, req.url, archive.paths['archivedSites'], function(data2){
        httpHelper.sendResponse(res, data2, 200);
      });
    break;
  case 'POST':
    res.end(archive.paths.list);
    break;
  default:
    httpHelper.sendResponse(res, "", 404);
    break;
}
   
  // res.end(archive.paths.list);
};
