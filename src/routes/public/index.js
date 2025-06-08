const express = require("express");
const routes = express.Router();

const checkApiKey = require("../../middlewares/apikey.middleware");
const accessController = require("../../controlers/access.controller");

// routes.post("/shop/signup", checkApiKey, accessController.signUp);

module.exports = routes;