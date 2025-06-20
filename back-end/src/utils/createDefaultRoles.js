import Role from "../models/Role.js";

export const createDefaultRoles = async () => {
  try {
    const defaultRoles = [
      {
        RoleName: "Tổ trưởng",
        Description: "Quản lý chung cư, có quyền cao nhất",
      },
      {
        RoleName: "Tổ phó",
        Description: "Hỗ trợ quản lý chung cư",
      },
      {
        RoleName: "Thủ quỹ",
        Description: "Quản lý tài chính và thu phí",
      },
    ];

    for (const roleData of defaultRoles) {
      const existingRole = await Role.findOne({
        where: { RoleName: roleData.RoleName },
      });

      if (!existingRole) {
        await Role.create(roleData);
        console.log(`Default role "${roleData.RoleName}" created successfully`);
      } else {
        console.log(`Default role "${roleData.RoleName}" already exists`);
      }
    }
  } catch (error) {
    console.error("Error creating default roles:", error);
  }
};
