const express = require("express");
const routes = express.Router();
const signUpCcontroller = require("../../controlers/access/signUp.controller");
const loginController = require("../../controlers/access/logIn.controller");
const LogOutController = require("../../controlers/access/logOut.controller");
const refreshTokenController = require("../../controlers/access/refreshToken.controller");
const asyncErrorHandle = require("../../utils/asyncErrorHandle");

routes.post("/shop/signup", asyncErrorHandle(signUpCcontroller));
routes.post("/shop/login", asyncErrorHandle(loginController));
routes.post("/shop/logout", asyncErrorHandle(LogOutController));
routes.post("/shop/refresh", asyncErrorHandle(refreshTokenController));

module.exports = routes;