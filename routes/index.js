"use strict";

const Router = require("express").Router();

const userRouter = require("./user");

Router.get("/", function (req, res, next) {
  res.status(200).json({
    message: "server ready",
  });
});

Router.use("/users", userRouter);

module.exports = Router;
