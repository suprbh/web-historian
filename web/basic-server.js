var http = require("http");
var url = require("url");
var handler = require("./request-handler");
var httpHelper = require("./http-helpers.js");
var archive = require("../helpers/archive-helpers.js");
var htmlfetcher = require("../workers/htmlfetcher.js");

var port = 8080; // 8080 sb changed to 3000?
var ip = "127.0.0.1";
var server = http.createServer(function(request, response){
	
  console.log("Creating server: url: ", request.url);
  htmlfetcher.htmlfetcher();

  // handle request to access index.html which has links to the archived pages
  if ( request.url === "/index.html" ){
    console.log("Found url ", request.url);
    httpHelper.serveAssets(response, request.url, archive.paths['siteAssets'], function(data){
      if (data){
        httpHelper.sendResponse(response, data, 200);
      }
    });
    // httpHelper.serveAssets(response, archive.paths['siteAssets'] + '/style.css', function(data){
    //   httpHelper.sendResponse(response, data, 200);
    // });
  } else {

    var newpath = archive.paths['archivedSites'];
    console.log("[basic-server]: ", newpath, request.url);
    archive.isURLArchived(request.url, newpath, function(retVal){
    	if(retVal){
        handler.handleRequest(request, response);
      }else {
        // download url
        // once done, update sites.txt
        
        archive.downloadUrls(request.url.substr(1));
        httpHelper.serveAssets(response, "/loading.html", archive.paths['siteAssets'], function(data){
          if (data){
            httpHelper.sendResponse(response, data, 200);
          } else {
            httpHelper.sendResponse(response, 'File not found', 404);
          }
        });
      }
    }); 
  }

});

console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);
