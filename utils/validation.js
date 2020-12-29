"use strict";

const validation = (data, callback) => {
  data.forEach((key, i) => {
    if (key.value == "" || key.value == undefined || key.value == null) {
      let objectResponse = {
        error: true,
        message: key.name + " is required",
        data: null
      };

      callback(objectResponse);
    }
  });
};

module.exports = {
  validate: validation
};
