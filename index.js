var fs = require("fs");
var JSONStream = require('JSONStream');
var es = require('event-stream');
var jsondiffpatch = require("jsondiffpatch");

const writeFile = () => {
  console.log("attempting to write file");
  fs.writeFile("diffLog.json", JSON.stringify(diffedLogs), (err) => console.log(err));
}

var getStream = function () {
  var jsonData = 'match-status.json',
      stream = fs.createReadStream(jsonData, { encoding: 'utf8' }).on("end", writeFile),
      parser = JSONStream.parse('*');
  return stream.pipe(parser);
};

const diffedLogs = [];

let previousTick;

getStream()
    .pipe(es.mapSync(function (data) {
      if(data.World.CurrentTick === 0){
        diffedLogs.push(data);
        previousTick = data;
        return;
      } else {
        var delta = jsondiffpatch.diff(previousTick, data);
        diffedLogs.push(delta);
        previousTick = data;
      }

      console.log("Current Tick: ", data.World.CurrentTick);
    }));
