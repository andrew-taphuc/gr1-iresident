import { DataTypes } from "sequelize";
import sequelize from "../config/dbsetup.js";

const Apartment = sequelize.define(
  "Apartment",
  {
    ApartmentID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ApartmentName: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    Phone: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    Address: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "Apartments",
    timestamps: false,
  }
);

export default Apartment;
