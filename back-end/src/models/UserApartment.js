import { DataTypes } from "sequelize";
import sequelize from "../config/dbsetup.js";
import User from "./User.js";
import Apartment from "./Apartment.js";

const UserApartment = sequelize.define(
  "UserApartment",
  {
    UserApartmentID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    UserID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: User, key: "UserID" },
    },
    ApartmentID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: Apartment, key: "ApartmentID" },
    },
  },
  {
    tableName: "User_Apartment",
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ["UserID", "ApartmentID"],
        name: "unique_user_apartment",
      },
    ],
  }
);

UserApartment.belongsTo(User, { foreignKey: "UserID" });
UserApartment.belongsTo(Apartment, { foreignKey: "ApartmentID" });

export default UserApartment;
