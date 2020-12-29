"use-strict";

const async = require("async");
const models = require("../models");
const md5 = require("md5");
const jwt = require("../utils/jwt");

const login = (req, res) => {
  let query = "";
  async.waterfall(
    [
      function validation(callback) {
        let valid = true;
        let dataValidator = [
          {
            name: "username",
            value: req.body.username
          },
          {
            name: "password",
            value: req.body.password
          }
        ];

        req.validation.validate(dataValidator, err => {
          if (err) {
            valid = false;
            return req.output(req, res, err, "error", 400);
          }
        });

        if (!valid) return;
        callback(null, {});
      },
      function checkUsername(data, callback) {
        let reg = /^[0-9]*$/;

        // Check if phone number
        if (reg.test(req.body.username)) {
          query =
            "select id, email, firstname, lastname, role, phone, status from users where phone = '" +
            req.body.username +
            "' and  password = '" +
            md5(req.body.password) +
            "'";
        } else {
          query =
            "select id, email, firstname, lastname, role, phone, status from users where email = '" +
            req.body.username +
            "' and  password = '" +
            md5(req.body.password) +
            "'";
        }

        callback(null, data);
      },
      function checkUser(data, callback) {
        models.sequelize.query(query).then((result, err) => {
          if (err) return callback(err)

          if (result[0].length < 1)
            return callback({
              error: true,
              message: "Username or password is wrong",
              data: {}
            })

          let token = jwt.generateAccessToken(req.body);
          result[0][0].token = token;

          callback(null, result[0][0]);
        });
      },
      function final(data, callback) {
        callback(null, {
          error: false,
          message: "Success login",
          data: data
        });
      }
    ],
    (err, result) => {
      if (err) return req.output(req, res, err, "error", 400);
      return req.output(req, res, result, "info", 200);
    }
  );
};

const register = async (req, res) => {
  async.waterfall(
    [
      function validation(callback) {
        let valid = true;
        let dataValidator = [
          {
            name: "email",
            value: req.body.email
          },
          {
            name: "firstname",
            value: req.body.firstname
          },
          {
            name: "lastname",
            value: req.body.lastname
          },
          {
            name: "phone",
            value: req.body.phone
          },
          {
            name: "password",
            value: req.body.password
          },
          {
            name: "role",
            value: req.body.role
          }
        ];

        req.validation.validate(dataValidator, err => {
          if (err) {
            valid = false;
            return req.output(req, res, err, "error", 400);
          }
        });

        if (!valid) return;
        callback(null, {});
      },
      function checkEmail(data, callback) {
        models.sequelize
          .query("select * from users where email = '" + req.body.email + "'")
          .then((result, err) => {
            if (err) return callback(err)

            if (result[0].length > 0)
              return callback({
                error: true,
                message: "Email was registered",
                data: {}
              });

            callback(null, data);
          })
          .catch(err => {
            callback(null, err);
          });
      },
      function checkPhone(data, callback) {
        models.sequelize
          .query("select * from users where phone = '" + req.body.phone + "'")
          .then((result, err) => {
            if (err) return callback(err)

            if (result[0].length > 0)
              return callback({
                error: true,
                message: "Phone was registered",
                data: {}
              });

            callback(null, data);
          })
          .catch(err => {
            callback(null, err);
          });
      },
      function createUser(data, callback) {
        req.body.password = md5(req.body.password);
        models.user
          .create(req.body)
          .then((result, err) => {
            if (err) return callback(err)

            if (req.body.role == 'Customer') {
              models.customer
                .create({
                  user_id: result.id
                })
                .then(() => {
                  console.log("Success create member customer");
                });
            } else if (req.body.role_id == 'Owner') {
              models.owner
                .create({
                  user_id: result.id
                })
                .then(() => {
                  console.log("Success create member owner");
                });
            } else {
              return callback({
                error: false,
                message: "Role not found",
                data: {}
              })
            }

            let messageRole = req.body.role == "Customer" ? "customer" : "owner"
            callback(null, {
              error: false,
              message: "Success Register as " + messageRole,
              data: {}
            });
          })
      }
    ],
    (err, result) => {
      if (err) return req.output(req, res, err, "error", 400);
      return req.output(req, res, result, "info", 200);
    }
  );
};

module.exports = { login, register };
