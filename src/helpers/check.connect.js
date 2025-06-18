const mongoose = require("mongoose");
const os = require("os");
const process = require("process");

const _SECONDS = 5 * 60 * 1000;     // 5 minute

let intervalId = null;

// count connect
const countConnect = () => {
    const numConnection = mongoose.connections.length;
    console.log(`Number of connections::${numConnection}`);
}

// check over load
const checkOverLoad = () => {
    intervalId = setInterval(() => {
        const numConnection = mongoose.connections.length;
        const numCores = os.cpus().length;
        const memoryUsage = process.memoryUsage.rss();
        const maxConnections = numCores * 5;

        console.log(`Memory usage::${memoryUsage / 1024 / 1024}`);

        if (numConnection > maxConnections) {
            console.log("Connection over load detected!");
        }
    }, _SECONDS);            
}

// stop check over load
const stopOverLoadCheck = () => {
    if (intervalId) {
        clearInterval(intervalId);      // stop monitoring
        intervalId = null;
        console.log("Over load monitoring stopped!");
    }
}

// bind to exit (ctr C) event
process.on("SIGINT", () => {
    stopOverLoadCheck();
    process.exit(0);
})

module.exports = { countConnect, checkOverLoad, stopOverLoadCheck };