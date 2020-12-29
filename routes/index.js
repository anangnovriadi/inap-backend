const express = require("express");
const router = express.Router();
const generateToken = require("../controller/generateToken");
const authController = require("../controller/authController");
const roomController = require("../controller/roomController");

module.exports = app => {
  router.get("/generate-token", generateToken.generate);

  // auth
  router.post("/register", authController.register);
  router.post("/login", authController.login);

  // room
  router.post("/room/create", roomController.createRoom);
  router.post("/room/update/:id", roomController.updateRoom);
  router.post("/room/delete/:id", roomController.deleteRoom);
  router.post("/room", roomController.listRoom);

  app.use("/api", router);
};
