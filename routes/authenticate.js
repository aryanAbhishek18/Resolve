const express = require("express");
const bcryptHash = require("../utils/bcryptHash");
const bcryptCompare = require("../utils/bcryptCompare");
const jwtSign = require("../utils/jwtSign");
const studentModel = require("../models/student");
const staffModel = require("../models/staff");

const router = express.Router();

router.post(
  "/signUp",
  async (req, res, next) => {
    try {
      const name = req.body.name;
      const email = req.body.email;
      const password = req.body.password;
      const category = req.body.category;

      let checkUser = null;

      if (category === "student") {
        checkUser = await studentModel.findOne({
          email: email,
        });
        if (checkUser) {
          return res.json({
            status: 409,
            message: "This email is already in use!",
          });
        } else {
          next();
        }
      } else if (category === "administration") {
        checkUser = await staffModel.findOne({
          email: email,
        });
        if (checkUser) {
          return res.json({
            status: 409,
            message: "This email is already in use!",
          });
        } else {
          next();
        }
      } else {
        return res.json({
          status: 400,
          message: "Bad request!",
        });
      }
    } catch (e) {
      console.log(e);
      return res.json({
        status: 500,
        message: "Internal server error!",
      });
    }
  },
  bcryptHash,
  async (req, res) => {
    try {
      const name = req.body.name;
      const email = req.body.email;
      const category = req.body.category;
      const hashedPass = req.hashedPassword;

      if (category === "student") {
        const newUser = await studentModel.create({
          name: name,
          email: email,
          password: hashedPass,
        });

        const token = await jwtSign(newUser._id);

        if (!token) {
          return res.json({
            status: 500,
            message: "Internal server error in generating the token!",
          });
        }

        return res.json({
          status: 200,
          message: "Sign Up successful!",
          token: token,
        });
      } else if (category === "administration") {
        const newUser = await staffModel.create({
          name: name,
          email: email,
          password: hashedPass,
        });

        const token = await jwtSign(newUser._id);

        if (!token) {
          return res.json({
            status: 500,
            message: "Internal server error in generating the token!",
          });
        }

        return res.json({
          status: 200,
          message: "Sign Up successful!",
          token: token,
        });
      } else {
        return res.json({
          status: 400,
          message: "Bad request!",
        });
      }
    } catch (e) {
      console.log(e);
      return res.json({
        status: 500,
        message: "Internal server error!",
      });
    }
  }
);

router.post(
  "/signIn",
  async (req, res, next) => {
    try {
      const email = req.body.email;
      const password = req.body.password;
      const category = req.body.category;

      if (category === "student") {
        const checkUser = await studentModel.findOne({
          email: email,
        });

        if (!checkUser) {
          return res.json({
            status: 403,
            message: "Wrong credentials!",
          });
        } else {
          req.expectedUser = checkUser;
          next();
        }

      } else if (category === "administration") {
        const checkUser = await staffModel.findOne({
          email: email,
        });

        if (!checkUser) {
          return res.json({
            status: 403,
            message: "Wrong credentials!",
          });
        } else {
          req.expectedUser = checkUser;
          next();
        }

      }
      else {
        return res.json({
          status: 400,
          message: "Bad request!",
        });
      }

    } catch (e) {
      return res.json({
        status: 500,
        message: "Internal server error!",
      });
    }
  },
  bcryptCompare,
  async (req, res) => {
    try {
      const user = req.expectedUser;

      const token = await jwtSign(user._id);
      if (!token) {
        return res.json({
          status: 500,
          message: "Internal server error in generating the token!",
        });
      }

      return res.json({
        status: 200,
        message: "Sign In successful!",
        token: token,
      });
    } catch (e) {
      console.log(e);
      return res.json({
        status: 500,
        message: "Internal server error!",
      });
    }
  }
);

module.exports = router;
