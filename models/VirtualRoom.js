const { DataTypes } = require("sequelize");
const sequelize = require("../backend/db");

const VirtualRoom = sequelize.define("VirtualRoom", {
  Room_ID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  Room_Name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Created_By: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  Creation_Date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  Room_Type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = VirtualRoom;
