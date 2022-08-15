# EC-2022 Arctica Log Compressor

You can use this script to reduce the size of the logs by tracking only the diffs between the ticks.

It makes the logs a bit more difficult to read because of the way it generates the diffs in a format that the used library [jsondiffpatch](http://badge.fury.io/js/jsondiffpatch) generates.

It also uses a stream reader to load in the logs.

The script is configured to diff the logs in a sequential mannor (based on my limited testing and use case this results in the smallest file size).

The library that is used to create the diffs can also be used to `patch` the diffs onto an existing json object aswell as `unpatching` which may be useful if you need to go to a previous tick.

There is additional functionality which can be seen on the libraries [documentation](http://badge.fury.io/js/jsondiffpatch).

E.g.:
```js
const forwardPatchedLog = jsondiffpatch.patch(currentGameState, nextTickDelta);
const unPatchedLog = jsondiffpatch.unpatch(currentGameState, previouslyAppliedDelta);
```
<hr>

## Usage

This is a node based script so you will need to have [node.js](https://nodejs.dev/en/) & npm installed.

### Steps to Run:
1. In the project directory run the command `npm i`.
1. The script will look for the file: `match-status.json` in its directory, you can either:
    * Rename your log file and move it to the same directory as the script.
    * Change the path in `index.js` on `line 12` to point to the log file you want to diff.
1. Run the command `npm start` and when the script is complete the diffed log will be created in the project directory with the filename of `diffLog.json`

