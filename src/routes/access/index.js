const express = require("express");
const routes = express.Router();
const accessController = require("../../controlers/access.controller");

routes.post("/shop/signup", accessController.Signup);

module.exports = routes;