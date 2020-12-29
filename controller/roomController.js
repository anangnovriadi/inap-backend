"use-strict";

const models = require("../models");

const createRoom = async (req, res) => {
  let room = await models.room.create({
    owner_id: req.body.owner_id,
    name: req.body.name,
    description: req.body.description,
    info_address: req.body.info_address,
    facilities: req.body.facilities,
    price: req.body.price,
    discount: req.body.discount,
    photo: req.body.photo
  })

  let objectResponse = {
    error: false,
    message: "Created",
    data: room
  }

  return req.output(req, res, objectResponse, "info", 200);
};

const listRoom = async (req, res) => {
  let query = !req.body.owner_id ? {} : {
    where: {
      owner_id: req.body.owner_id
    }
  };
  let room = await models.room.findAll(query)

  let objectResponse = {
    error: false,
    message: room.length > 0 ? "Found" : "Not Found",
    data: room,
    count: room.length
  }

  return req.output(req, res, objectResponse, "info", 200);
};

const updateRoom = async (req, res) => {
  let room = await models.room.update(
    {
      name: req.body.name,
      description: req.body.description,
      info_address: req.body.info_address,
      facilities: req.body.facilities,
      price: req.body.price,
      discount: req.body.discount,
      photo: req.body.photo
    },
    {
      where: {
        id: req.params.id
      }
    }
  )

  let objectResponse = {
    error: false,
    message: room[0] == 1 ? "Updated" : "Not Update",
    data: {}
  }

  return req.output(req, res, objectResponse, "info", 200);
};

const deleteRoom = async (req, res) => {
  await models.room.destroy(
    {
      where: {
        id: req.params.id
      }
    }
  )

  let objectResponse = {
    error: false,
    message: "Deleted",
    data: {}
  }

  return req.output(req, res, objectResponse, "info", 200);
};

module.exports = { createRoom, listRoom, updateRoom, deleteRoom };
