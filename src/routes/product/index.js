const express = require("express");
const asyncErrorHandle = require("../../utils/asyncErrorHandle");
const createProductController = require("../../controlers/product/createProduct.controller");
const routes = express.Router();

routes.post("/product", asyncErrorHandle(createProductController));

module.exports = routes;