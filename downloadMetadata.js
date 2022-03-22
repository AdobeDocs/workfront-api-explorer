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

// result.forEach(apiMetaFile => {
//   fs.readFile(apiMetaFile, "utf8", (err, jsonString) => {
//     if (err) {
//       console.log("File read failed:", err);
//       return;
//     }
  
//     let fileDataJson = JSON.parse(jsonString);  
//     for (let [apiKey, apiValue] of Object.entries(fileDataJson.data.objects)) {
//       for (let [apiInnerKey, apiInnerValue] of Object.entries(apiValue)) {
//         if(apiInnerKey === 'url'){
//           console.log(`${apiInnerKey}: ${apiInnerValue}`);
//         }
//       }
//     }
//   });
// });


fs.readFile(result[0], "utf8", (err, jsonString) => {
  if (err) {
    console.log("File read failed:", err);
    return;
  }

  let fileDataJson = JSON.parse(jsonString);

  for (let [apiKey, apiValue] of Object.entries(fileDataJson.data.objects)) {
    for (let [apiInnerKey, apiInnerValue] of Object.entries(apiValue)) {
      if(apiInnerKey === 'url'){
        console.log(`${apiInnerKey}: ${apiInnerValue}`);

        let urlPath = apiInnerValue.split('/metadata')[0];

        let lastIndex = urlPath.lastIndexOf('/');
        let code = urlPath.slice(lastIndex + 1)

        let downloadPath = result[0].split('/metadata.json')[0] + '/' + code + '.json';

        console.log(`download ${apiInnerValue} to ${downloadPath}`)
        download(apiInnerValue, )
      }
    }
  }
});
