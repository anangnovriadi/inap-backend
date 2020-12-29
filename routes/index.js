const express = require("express");
const router = express.Router();
const generateToken = require("../controller/generateToken");
const authController = require("../controller/authController");
const testController = require("../controller/testController");

module.exports = app => {
  router.get("/generate-token", generateToken.generate);
  router.get("/test", testController.list);

  // auth
  router.post("/register", authController.register);
  router.post("/login", authController.login);

  app.use("/api", router);
};
