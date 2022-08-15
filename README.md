EC-2022 Arctica Log Compressor
A lightweight JSON diffing tool
You can use this script to reduce the size of the logs by tracking only the diffs between the ticks.

It makes the logs a bit more difficult to read because of the way it generates the diffs in a format that the used library (jsondiffpatch)[http://badge.fury.io/js/jsondiffpatch] uses.

It also uses a stream reader to process and diff the logs.

The script is configured to diff the logs in a sequential mannor (based on my limited testing and use case this results in the smallest file size).

The library that is used to create the diffs can also be used to patch the diffs onto an existing json object.

E.g.:

const patchedLog = jsondiffpatch.patch(currentGameState, nextTickDelta);
