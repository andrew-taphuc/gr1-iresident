import * as roleService from "../services/RoleServices.js";

// Lấy tất cả vai trò
export const getAllRoles = async (req, res) => {
  try {
    const roles = await roleService.getAllRoles();
    res.status(200).json({ error: false, roles });
  } catch (error) {
    res
      .status(500)
      .json({ error: true, message: "Error retrieving roles", error });
  }
};

// Lấy vai trò theo ID
export const getRoleById = async (req, res) => {
  try {
    const role = await roleService.getRoleById(req.params.id);
    if (!role)
      return res.status(404).json({ error: true, message: "Role not found" });
    res.status(200).json({ error: false, role });
  } catch (error) {
    res
      .status(500)
      .json({ error: true, message: "Error retrieving role", error });
  }
};

// Thêm vai trò mới
export const createRole = async (req, res) => {
  try {
    const { RoleName, Description } = req.body;
    if (!RoleName) {
      return res
        .status(400)
        .json({ error: true, message: "RoleName is required" });
    }
    const newRole = await roleService.createRole({ RoleName, Description });
    res.status(201).json({ error: false, role: newRole });
  } catch (error) {
    res
      .status(500)
      .json({ error: true, message: "Error creating role", error });
  }
};

// Cập nhật vai trò
export const updateRole = async (req, res) => {
  try {
    const updated = await roleService.updateRole(req.params.id, req.body);
    if (!updated)
      return res.status(404).json({ error: true, message: "Role not found" });
    res.status(200).json({ error: false, role: updated });
  } catch (error) {
    res
      .status(500)
      .json({ error: true, message: "Error updating role", error });
  }
};

// Xóa vai trò
export const deleteRole = async (req, res) => {
  try {
    const deleted = await roleService.deleteRole(req.params.id);
    if (!deleted)
      return res.status(404).json({ error: true, message: "Role not found" });
    res
      .status(200)
      .json({ error: false, message: "Role deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: true, message: "Error deleting role", error });
  }
};
