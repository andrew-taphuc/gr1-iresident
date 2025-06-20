import { DataTypes } from "sequelize";
import sequelize from "../config/dbsetup.js";
import UserApartment from "./UserApartment.js";
import Role from "./Role.js";

const UserApartmentRole = sequelize.define(
  "UserApartmentRole",
  {
    UserApartmentRoleID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    UserApartmentID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: UserApartment, key: "UserApartmentID" },
    },
    RoleID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: Role, key: "RoleID" },
    },
    IsActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: "User_Apartment_Role",
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ["UserApartmentID", "RoleID"],
        name: "unique_user_apartment_role",
      },
    ],
  }
);

UserApartmentRole.belongsTo(UserApartment, { foreignKey: "UserApartmentID" });
UserApartmentRole.belongsTo(Role, { foreignKey: "RoleID" });

export default UserApartmentRole;
