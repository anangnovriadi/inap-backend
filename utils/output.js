"use strict";

const logger = require("nangning-logger-color");

module.exports = (req, res, objectResponse, type, status) => {
  if (type == "info") {
    // Logger info command line
    logger.info({
      ip: req.headers["x-forwarded-for"] || req.connection.remoteAddress,
      endpoint: req.originalUrl,
      params: req.body,
      method: req.method,
      results: objectResponse
    });
  } else if (type == "error") {
    // Logger error command line
    logger.error({
      ip: req.headers["x-forwarded-for"] || req.connection.remoteAddress,
      endpoint: req.originalUrl,
      params: req.body,
      method: req.method,
      results: objectResponse
    });
  }

  status = status === "" ? 200 : status;
  return res.status(status).send(objectResponse);
};
