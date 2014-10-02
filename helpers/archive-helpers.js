var fs = require('fs');
var http = require('http');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  'siteAssets' : path.join(__dirname, '../web/public'),
  'archivedSites' : path.join(__dirname, '../archives/sites'),
  'list' : path.join(__dirname, '../archives/sites.txt'),
};

// Used for stubbing paths for jasmine tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

exports.readListOfUrls = function(listArray){
	// open file archives/sites.txt
	// read each line '\n' delimited
	// store into an array.
  var filename = exports.paths.list;
  fs.exists(filename, function(exists){
    if (exists){
      fs.stat(filename, function(error, stats){
        if(error){
          console.log(error);
          return;
        }
        fs.open(filename, 'r', function(error, fd){
          var buffer = new Buffer(stats.size);
          fs.read(fd, buffer, 0, buffer.length, null, function(error, bytesRead, buffer){
            var data = buffer.toString( "utf8", 0, buffer.length );
            console.log(data);
            listArray = data;
            fs.close(fd);
          })
        });
      });
    }
  });
};

exports.isUrlInList = function(url){
	var urlList = readListOfUrls();
	if (urlList.indexOf(url) !== -1){
		return true;
	}
	return false;
};

exports.addUrlToList = function(url){
  //open file sites.txt
  // append to end of file
  var filename = exports.paths.list;
  fs.open(filename, 'a', function(err, fd){
    if (err){
      console.log(err);
    }
    fs.appendFile(filename, url+'\n', function(err){
      if(err){
        console.log(err);
      }
    });
    fs.close(fd);
  });

};

exports.isURLArchived = function(url, path, callback){
  console.log('[isURLArchived]: url', url);
  fs.readFile(path+url, function(err, data){
    if (err){
      console.log('[isURLArchived]: Cannot open file', url);
      callback(false);
    } 
    else {
      console.log('[isURLArchived]: File already Archived');
      callback(true);
    }
  });
};

exports.downloadUrls = function(url){
  var destPath = exports.paths['archivedSites'] + url;

  options = {
      host: url
    , port: 8080
    , path: '/'
  }

  var request = http.get(options, function(res){
    var data = ''
    res.setEncoding('utf8')

    res.on('data', function(chunk){
        data += chunk;
    });

    res.on('end', function(){
        fs.writeFile(destPath, data, 'utf8', function(err){
            if (err) throw err
            console.log('File saved.')
        });
    });

  });

  // var file = fs.createWriteStream(url);
  // var request = http.get(url, function(response){
  //   response.pipe(url);
  // });
  // exports.addUrlToList(url);
};

exports.fileExists = function(url){

};

