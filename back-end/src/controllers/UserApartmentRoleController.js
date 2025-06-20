import * as userApartmentRoleService from "../services/UserApartmentRoleServices.js";

// Lấy tất cả vai trò user-apartment
export const getAllUserApartmentRoles = async (req, res) => {
  try {
    const userApartmentRoles =
      await userApartmentRoleService.getAllUserApartmentRoles();
    res.status(200).json({ error: false, userApartmentRoles });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "Error retrieving user apartment roles",
      error,
    });
  }
};

// Lấy vai trò user-apartment theo ID
export const getUserApartmentRoleById = async (req, res) => {
  try {
    const userApartmentRole =
      await userApartmentRoleService.getUserApartmentRoleById(req.params.id);
    if (!userApartmentRole)
      return res
        .status(404)
        .json({ error: true, message: "UserApartmentRole not found" });
    res.status(200).json({ error: false, userApartmentRole });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "Error retrieving user apartment role",
      error,
    });
  }
};

// Thêm vai trò user-apartment mới
export const createUserApartmentRole = async (req, res) => {
  try {
    const { UserApartmentID, RoleID, IsActive } = req.body;
    if (!UserApartmentID || !RoleID) {
      return res.status(400).json({
        error: true,
        message: "UserApartmentID and RoleID are required",
      });
    }
    const newUserApartmentRole =
      await userApartmentRoleService.createUserApartmentRole({
        UserApartmentID,
        RoleID,
        IsActive: IsActive !== undefined ? IsActive : true,
      });
    res
      .status(201)
      .json({ error: false, userApartmentRole: newUserApartmentRole });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "Error creating user apartment role",
      error,
    });
  }
};

// Cập nhật vai trò user-apartment
export const updateUserApartmentRole = async (req, res) => {
  try {
    const updated = await userApartmentRoleService.updateUserApartmentRole(
      req.params.id,
      req.body
    );
    if (!updated)
      return res
        .status(404)
        .json({ error: true, message: "UserApartmentRole not found" });
    res.status(200).json({ error: false, userApartmentRole: updated });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "Error updating user apartment role",
      error,
    });
  }
};

// Xóa vai trò user-apartment
export const deleteUserApartmentRole = async (req, res) => {
  try {
    const deleted = await userApartmentRoleService.deleteUserApartmentRole(
      req.params.id
    );
    if (!deleted)
      return res
        .status(404)
        .json({ error: true, message: "UserApartmentRole not found" });
    res.status(200).json({
      error: false,
      message: "UserApartmentRole deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "Error deleting user apartment role",
      error,
    });
  }
};

// Lấy vai trò của user trong apartment
export const getRolesByUserApartment = async (req, res) => {
  try {
    const { userApartmentId } = req.params;
    const roles = await userApartmentRoleService.getRolesByUserApartment(
      userApartmentId
    );
    res.status(200).json({ error: false, roles });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "Error retrieving user apartment roles",
      error,
    });
  }
};

// Lấy users có vai trò trong apartment
export const getUsersByRoleInApartment = async (req, res) => {
  try {
    const { apartmentId, roleId } = req.params;
    const users = await userApartmentRoleService.getUsersByRoleInApartment(
      apartmentId,
      roleId
    );
    res.status(200).json({ error: false, users });
  } catch (error) {
    res
      .status(500)
      .json({ error: true, message: "Error retrieving users by role", error });
  }
};

// Cập nhật active status của tất cả roles của user-apartment
export const updateActiveStatus = async (req, res) => {
  try {
    const { userApartmentId } = req.params;
    const { IsActive } = req.body;

    if (IsActive === undefined || IsActive === null) {
      return res.status(400).json({
        error: true,
        message: "IsActive field is required",
      });
    }

    const updated =
      await userApartmentRoleService.updateActiveStatusByUserApartment(
        userApartmentId,
        IsActive
      );

    res.status(200).json({
      error: false,
      message: `Updated ${updated} role(s) active status to ${IsActive}`,
      updatedCount: updated,
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "Error updating active status",
      error: error.message,
    });
  }
};

// Xóa tất cả roles của user-apartment
export const deleteByUserApartment = async (req, res) => {
  try {
    const { userApartmentId } = req.params;
    const deleted = await userApartmentRoleService.deleteByUserApartment(
      userApartmentId
    );

    res.status(200).json({
      error: false,
      message: `Deleted ${deleted} role(s) successfully`,
      deletedCount: deleted,
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "Error deleting user apartment roles",
      error: error.message,
    });
  }
};
