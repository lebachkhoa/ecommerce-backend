const compression = require("compression");
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");

const app = express();

// init middlewares
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());

// init database
require("./dbs/init.mongodb");

// init routes
app.get("/", (req, res) => {
    const strCompression = "Hello Express";
    return res.status(200).json({
        message: "Welcome to Express",
        metadata: strCompression.repeat(10000)
    });
})

// handling error

module.exports = app;