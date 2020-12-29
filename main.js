const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const morgan = require("morgan");
const output = require("./utils/output");
const headersApi = require("./utils/headersApi");
const validation = require("./utils/validation");
const cors = require("cors");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Add custom request
app.use((req, res, next) => {
  req.API_HEADER = headersApi;
  req.API_URL = process.env.API_URL;
  req.output = output;
  req.validation = validation;

  next();
});

// Models
const models = require("./models");
models.sequelize
  .authenticate()
  .then(function() {
    console.log("Database Connected");
  })
  .catch(function(err) {
    console.log("Something error " + err);
  });

// Routes
require("./routes")(app);
app.get("*", (req, res, next) => {
  res.status(404).send({
    name: process.env.APP_NAME,
    message: "Not Found"
  });

  next();
});

const port = process.env.APP_PORT || 8000;
app.set("port", port);

// Listen App
const server = http.createServer(app);
server.listen(port);

// Start Environment
if (process.env.NODE_ENV == "development") {
  console.log(
    "======================================================================"
  );
  console.log("Name: " + process.env.APP_NAME);
  console.log("Environment: " + process.env.NODE_ENV);
  console.log("Running: " + "http://" + process.env.NODE_HOST + ":" + port);
  console.log(
    "======================================================================"
  );
}

function environment(name, env, host) {
  this.Name = name;
  this.Environment = env;
  this.Running = host;
}

let env = new environment(
  process.env.APP_NAME,
  process.env.NODE_ENV,
  "http://" + process.env.NODE_HOST + ":" + port
);

console.table(env);

module.exports = app;
