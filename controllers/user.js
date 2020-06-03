"use strict";

const modelUser = require("../models").User;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const md5 = require("md5");

class userController {
  static register (req, res, next) {
    modelUser
      .count({
        where: {
          email: req.body.email.toLowerCase().trim(),
        },
      })
      .then((userCount) => {
        if (userCount > 0) {
          throw new Error(
            `email ${req.body.email} has been registred, please try register another email!`
          );
        } else {
          return modelUser.create({
            email: req.body.email.toLowerCase().trim(),
            password: req.body.password,
          });
        }
      })
      .then((user) => {
        res.status(201).json({
          message: `Registration Success !`,
          user,
        });
      })
      .catch(next);
  };

  static login (req, res, next) {
    modelUser
      .findOne({
        where: {
          email: req.body.email.toLowerCase().trim(),
        },
      })
      .then((user) => {
        if (
          !user ||
          !bcrypt.compareSync(req.body.password || "", user.password)
        ) {
          next({
            message: `Invalid email / Password !`,
          });
        } else {
          const payload = {
            userID: user.id,
            checker: md5(user.updatedAt),
          };
          const access_token = jwt.sign(payload, process.env.JWT_SECRET_KEY);
          res.status(200).json({
            message: `signin success`,
            access_token,
          });
        }
      })
      .catch(next);
  };
}

module.exports = userController;
