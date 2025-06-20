import { DataTypes } from "sequelize";
import sequelize from "../config/dbsetup.js";
import Apartment from "./Apartment.js";

const Household = sequelize.define(
  "Household",
  {
    HouseholdID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ApartmentID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: Apartment, key: "ApartmentID" },
    },
    RoomNumber: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
    Type: {
      type: DataTypes.ENUM("Đơn", "Đôi"),
      allowNull: false,
    },
    HouseholdHead: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    Members: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    HasVehicle: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    Notes: {
      type: DataTypes.TEXT,
    },
  },
  {
    tableName: "Households",
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ["ApartmentID", "RoomNumber"],
        name: "unique_apartment_room",
      },
    ],
  }
);

Household.belongsTo(Apartment, { foreignKey: "ApartmentID" });

export default Household;
