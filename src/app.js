const compression = require("compression");
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const env = require("dotenv");
const { NotFoundRequestError } = require("./core/error.response");
env.config();

const app = express();

// console.log("Process::", process.env);

// init middlewares
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
app.use(express.urlencoded({ extended: true }));     // using with Form
app.use(express.json());
app.use(cookieParser());

// init database
require("./dbs/init.mongodb");

// init routes
app.use("/", require("./routes"));

// catch all route for unmatch paths - forward to error handler middleware
app.use((req, res, next) => {
    next(new NotFoundRequestError());
});

// centralized Error handling middleware
app.use((error, req, res, next) => {
    const status = error.status || 500;
    return res.status(status).json({
        status: status,
        message: error.message || "Internal Server Error"
    });
});


module.exports = app;