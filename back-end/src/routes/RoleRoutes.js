import express from "express";
import * as roleController from "../controllers/RoleController.js";

const router = express.Router();

router.get("/get-all-roles", roleController.getAllRoles);
router.get("/get-role-by-id/:id", roleController.getRoleById);
router.post("/create-role", roleController.createRole);
router.put("/update-role/:id", roleController.updateRole);
router.delete("/delete-role/:id", roleController.deleteRole);

export default router;
