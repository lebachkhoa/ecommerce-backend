const compression = require("compression");
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");

const env = require("dotenv");
env.config();

const app = express();

// console.log("Process::", process.env);

// init middlewares
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
// app.use(express.urlencoded({ extended: true }));     // form
app.use(express.json());

// init database
require("./dbs/init.mongodb");

// init routes
app.use("/", require("./routes"));

// handling error

module.exports = app;