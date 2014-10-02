// eventually, you'll have some code here that uses the code in `archive-helpers.js`
// to actually download the urls you want to download.
var http = require('http');
var fs = require('fs');
var archive = require('../helpers/archive-helpers.js');

// cron job script
// Write a script in workers/htmlfetcher.js that uses the code in helpers/archive-helpers.js 
// to download files when it runs (and then exit).

exports.htmlfetcher = function(){
  console.log("[htmlfetcher]: Called");
  archive.readListOfUrls(function(list){
    for (var i = list.length - 1; i >= 0; i--){
      console.log('[htmlfetcher]: working on url: ', url);
      if (fileExists(archive.paths['archivedSites'] + url) === false) {
        console.log('[htmlfetcher]: downloading url', url);
        // file is not already downloaded, so download it
        archive.downloadUrls(list[i]);
      }
    }
  });
};

exports.htmlfetcher();