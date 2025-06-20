import { DataTypes } from "sequelize";
import sequelize from "../config/dbsetup.js";

const User = sequelize.define(
  "User",
  {
    UserID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    Password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    FullName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    Email: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    PhoneNumber: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    Status: {
      type: DataTypes.ENUM("Đang hoạt động", "Đã nghỉ việc"),
      defaultValue: "Đang hoạt động",
    },
  },
  {
    tableName: "Users",
    timestamps: false,
  }
);

export default User;
