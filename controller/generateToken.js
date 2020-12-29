"use-strict";

const jwt = require("../utils/jwt");

const generate = async (req, res) => {
  let token = jwt.generateTokenSecret();

  return res.json({
    token: token
  })
};

module.exports = { generate };
