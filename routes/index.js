const express = require("express");
const router = express.Router();
const jwt = require("../utils/jwt");
const authToken = jwt.authenticateToken;
const generateToken = require("../controller/generateToken");
const authController = require("../controller/authController");
const roomController = require("../controller/roomController");

module.exports = app => {
  router.get("/generate-token", generateToken.generate);

  // auth
  router.post("/register", authController.register);
  router.post("/login", authController.login);

  // room
  router.post("/room/create", authToken, roomController.createRoom);
  router.post("/room/update/:id", authToken, roomController.updateRoom);
  router.post("/room/delete/:id", authToken, roomController.deleteRoom);
  router.post("/room", authToken, roomController.listRoom);

  app.use("/api", router);
};
