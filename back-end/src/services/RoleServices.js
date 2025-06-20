import Role from "../models/Role.js";

// Lấy tất cả vai trò
export const getAllRoles = async () => {
  return await Role.findAll();
};

// Lấy vai trò theo ID
export const getRoleById = async (id) => {
  return await Role.findByPk(id);
};

// Thêm vai trò mới
export const createRole = async (roleData) => {
  return await Role.create(roleData);
};

// Cập nhật vai trò
export const updateRole = async (id, updateData) => {
  const role = await Role.findByPk(id);
  if (!role) return null;
  await role.update(updateData);
  return role;
};

// Xóa vai trò
export const deleteRole = async (id) => {
  const role = await Role.findByPk(id);
  if (!role) return null;
  await role.destroy();
  return true;
};
