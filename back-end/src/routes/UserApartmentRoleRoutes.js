import express from "express";
import * as userApartmentRoleController from "../controllers/UserApartmentRoleController.js";

const router = express.Router();

router.get(
  "/get-all-user-apartment-roles",
  userApartmentRoleController.getAllUserApartmentRoles
);
router.get(
  "/get-user-apartment-role-by-id/:id",
  userApartmentRoleController.getUserApartmentRoleById
);
router.post(
  "/create-user-apartment-role",
  userApartmentRoleController.createUserApartmentRole
);
router.put(
  "/update-user-apartment-role/:id",
  userApartmentRoleController.updateUserApartmentRole
);
router.delete(
  "/delete-user-apartment-role/:id",
  userApartmentRoleController.deleteUserApartmentRole
);
router.get(
  "/get-roles-by-user-apartment/:userApartmentId",
  userApartmentRoleController.getRolesByUserApartment
);
router.get(
  "/get-users-by-role-in-apartment/:apartmentId/:roleId",
  userApartmentRoleController.getUsersByRoleInApartment
);
router.put(
  "/update-active-status/:userApartmentId",
  userApartmentRoleController.updateActiveStatus
);
router.delete(
  "/delete-by-user-apartment/:userApartmentId",
  userApartmentRoleController.deleteByUserApartment
);

export default router;
