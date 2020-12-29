"use strict";

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    "room",
    {
      owner_id: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      info_address: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      facilities: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      discount: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      photo: {
        type: DataTypes.TEXT,
        allowNull: true
      }
    },
    {
      tableName: "rooms",
      timestamps: false
    }
  );
};
