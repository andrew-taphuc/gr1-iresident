import { DataTypes } from "sequelize";
import sequelize from "../config/dbsetup.js";

const Role = sequelize.define(
  "Role",
  {
    RoleID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    RoleName: {
      type: DataTypes.ENUM("Tổ trưởng", "Tổ phó", "Thủ quỹ"),
      allowNull: false,
      unique: true,
    },
    Description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "Roles",
    timestamps: false,
  }
);

export default Role;
