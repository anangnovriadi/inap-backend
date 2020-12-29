"use-strict";

const models = require("../models");

const list = async (req, res) => {
  let objectResponse = await {
    error: true,
    message: "Found",
    data: {
      name: "alex",
      address: "madagaskar"
    }
  };

  return req.output(req, res, objectResponse, "info", 200);
};

module.exports = { list };
