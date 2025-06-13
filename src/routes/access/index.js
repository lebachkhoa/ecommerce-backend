const express = require("express");
const routes = express.Router();
const accessController = require("../../controlers/access.controller");
const asyncErrorHandle = require("../../utils/asyncErrorHandle");

routes.post("/shop/signup", asyncErrorHandle(accessController.signUp));
routes.post("/shop/login", asyncErrorHandle(accessController.login));

module.exports = routes;