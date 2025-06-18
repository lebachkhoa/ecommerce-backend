const express = require("express");
const routes = express.Router();

routes.use("/v1/api", require("./access"));
routes.use("/v1/api", require("./product"));
routes.use("/v1/api/public", require("./public"));

module.exports = routes;