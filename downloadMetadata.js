var http = require('http');
var fs = require('fs');
const path = require('path');
const download = require('download');

const directoryPath = path.join(__dirname, 'static/attask/');

const getAllFiles = dir =>
  fs.readdirSync(dir).reduce((files, file) => {
    const name = path.join(dir, file);
    const isDirectory = fs.statSync(name).isDirectory();
    return isDirectory ? [...files, ...getAllFiles(name)] : [...files, name];
  }, []);

var result = getAllFiles(directoryPath);

result.forEach(apiMetaFile => {
  if(apiMetaFile.indexOf('.json' >= 0)){
    fs.readFile(apiMetaFile, "utf8", (err, jsonString) => {
      if (err) {
        console.log("File read failed:", err);
        return;
      }
  
      let fileDataJson = JSON.parse(jsonString);
  
      for (let [apiKey, apiValue] of Object.entries(fileDataJson.data.objects)) {
        for (let [apiInnerKey, apiInnerValue] of Object.entries(apiValue)) {
          if(apiInnerKey === 'url'){
            let urlPath = apiInnerValue.split('/metadata')[0];
    
            let lastIndex = urlPath.lastIndexOf('/');
            let code = urlPath.slice(lastIndex + 1)
    
            let downloadPath = apiMetaFile.split('/metadata.json')[0] + '/' + code + '.json';
            
            (async () => {
              fs.writeFileSync(downloadPath, await download(apiInnerValue));
            })();
          }
        }
      }
    });
  }
});


