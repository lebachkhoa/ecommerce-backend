const mongoose = require("mongoose");
const { countConnect, checkOverLoad } = require("../helpers/check.connect");

const { dbConfig: { host, port, name } } = require("../configs/config");

const connectString = `mongodb://${host}:${port}/${name}`;

class Database {
    constructor() {
        this.connect();
    }

    // connect
    connect(type = "mongodb") {
        if (1 == 1) {
            mongoose.set("debug", true);
            mongoose.set("debug", { color: true });
        }

        mongoose.connect(connectString, {
            maxPoolSize: 50                     // defalt 100
        }).then(_ => {
            console.log("Connected Mongobd successful::", connectString);
            countConnect();         // monitor the connection
            checkOverLoad();        // check if the number of connection exceed CPU-base threshold
        })
            .catch(err => console.log("Error connect database!"));
    }

    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }

        return Database.instance;
    }
}

const instanceMongodb = Database.getInstance();
module.exports = instanceMongodb;