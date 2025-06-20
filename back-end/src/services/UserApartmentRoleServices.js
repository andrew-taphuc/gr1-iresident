import UserApartmentRole from "../models/UserApartmentRole.js";
import UserApartment from "../models/UserApartment.js";
import Role from "../models/Role.js";
import User from "../models/User.js";
import Apartment from "../models/Apartment.js";

// Lấy tất cả vai trò user-apartment
export const getAllUserApartmentRoles = async () => {
  return await UserApartmentRole.findAll({
    include: [
      {
        model: UserApartment,
        include: [
          { model: User, attributes: ["UserID", "Username", "FullName"] },
          { model: Apartment, attributes: ["ApartmentID", "ApartmentName"] },
        ],
      },
      { model: Role, attributes: ["RoleID", "RoleName", "Description"] },
    ],
  });
};

// Lấy vai trò user-apartment theo ID
export const getUserApartmentRoleById = async (id) => {
  return await UserApartmentRole.findByPk(id, {
    include: [
      {
        model: UserApartment,
        include: [
          { model: User, attributes: ["UserID", "Username", "FullName"] },
          { model: Apartment, attributes: ["ApartmentID", "ApartmentName"] },
        ],
      },
      { model: Role, attributes: ["RoleID", "RoleName", "Description"] },
    ],
  });
};

// Thêm vai trò user-apartment mới
export const createUserApartmentRole = async (userApartmentRoleData) => {
  return await UserApartmentRole.create(userApartmentRoleData);
};

// Cập nhật vai trò user-apartment
export const updateUserApartmentRole = async (id, updateData) => {
  const userApartmentRole = await UserApartmentRole.findByPk(id);
  if (!userApartmentRole) return null;
  await userApartmentRole.update(updateData);
  return userApartmentRole;
};

// Xóa vai trò user-apartment
export const deleteUserApartmentRole = async (id) => {
  const userApartmentRole = await UserApartmentRole.findByPk(id);
  if (!userApartmentRole) return null;
  await userApartmentRole.destroy();
  return true;
};

// Lấy vai trò của user trong apartment (bao gồm cả active và inactive)
export const getRolesByUserApartment = async (userApartmentId) => {
  return await UserApartmentRole.findAll({
    where: { UserApartmentID: userApartmentId },
    include: [
      { model: Role, attributes: ["RoleID", "RoleName", "Description"] },
    ],
    order: [["IsActive", "DESC"]], // Active roles trước
  });
};

// Lấy users có vai trò trong apartment
export const getUsersByRoleInApartment = async (apartmentId, roleId) => {
  return await UserApartmentRole.findAll({
    where: { RoleID: roleId, IsActive: true },
    include: [
      {
        model: UserApartment,
        where: { ApartmentID: apartmentId },
        include: [
          {
            model: User,
            attributes: ["UserID", "Username", "FullName", "Email"],
          },
        ],
      },
      { model: Role, attributes: ["RoleID", "RoleName"] },
    ],
  });
};

// Cập nhật active status của tất cả roles của user-apartment
export const updateActiveStatusByUserApartment = async (
  userApartmentId,
  isActive
) => {
  const [updatedCount] = await UserApartmentRole.update(
    { IsActive: isActive },
    {
      where: { UserApartmentID: userApartmentId },
      returning: true,
    }
  );
  return updatedCount;
};

// Xóa tất cả roles của user-apartment
export const deleteByUserApartment = async (userApartmentId) => {
  const deletedCount = await UserApartmentRole.destroy({
    where: { UserApartmentID: userApartmentId },
  });
  return deletedCount;
};
