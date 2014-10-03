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
    console.log("[htmlfetcher]: [list]: ", list);
    for (var i = list.length - 1; i >= 0; i--){
      // console.log('[htmlfetcher]: working on url: ', list[i]);
      archive.isURLArchived('/'+list[i], archive.paths['archivedSites'], function(ret, url){
        if (!ret){
          console.log('[htmlfetcher]: downloading url', url);
          archive.downloadUrls(url.substr(1));
        }
      }); // isURLArchived
    }  // for loop
  }); // readListOfUrls
};

exports.htmlfetcher();