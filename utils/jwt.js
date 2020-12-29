const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null)
    return req.output(
      req,
      res,
      {
        error: true,
        message: "Unauthorized"
      },
      "error",
      401
    );

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err)
      return req.output(
        req,
        res,
        {
          error: true,
          message: "Unauthentication"
        },
        "error",
        403
      );

    // console.log(user);
    next();
  });
}

function generateAccessToken(payload) {
  return jwt.sign({ data: payload }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.EXPIRED_TOKEN
  });
}

function generateTokenSecret() {
  let token = require("crypto")
    .randomBytes(32)
    .toString("hex");
  return token;
}

module.exports = {
  authenticateToken,
  generateAccessToken,
  generateTokenSecret
};
