"use strict";

const Router = require("express").Router();

const userController = require("../controllers/user");

Router.post("/signup", userController.register);
Router.post("/signin", userController.login);

module.exports = Router;
