var http = require('http');
var fs = require('fs');
const path = require('path');

var download = function(url, dest, cb) {
  var file = fs.createWriteStream(dest);
  var request = http.get(url, function(response) {
    response.pipe(file);
    file.on('finish', function() {
      file.close(cb);  // close() is async, call cb after close completes.
    });
  }).on('error', function(err) { // Handle errors
    fs.unlink(dest); // Delete the file async. (But we don't check the result)
    if (cb) cb(err.message);
  });
};

const directoryPath = path.join(__dirname, 'static/attask/api');

const getAllFiles = dir =>
  fs.readdirSync(dir).reduce((files, file) => {
    const name = path.join(dir, file);
    const isDirectory = fs.statSync(name).isDirectory();
    return isDirectory ? [...files, ...getAllFiles(name)] : [...files, name];
  }, []);

var result = getAllFiles(directoryPath);

console.log(result);
console.log();


fs.readFile(result[0], "utf8", (err, jsonString) => {
  if (err) {
    console.log("File read failed:", err);
    return;
  }
  //console.log("File data:", jsonString);
  let fileDataJson = JSON.parse(jsonString);
  console.log(fileDataJson.data.objects)
});