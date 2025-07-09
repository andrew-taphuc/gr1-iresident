import express from "express";
import * as userApartmentRoleController from "../controllers/UserApartmentRoleController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: User Apartment Roles
 *   description: User-Apartment-Role relationship management endpoints
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserApartmentRole:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         userApartmentId:
 *           type: integer
 *         roleId:
 *           type: integer
 *         isActive:
 *           type: boolean
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *         UserApartment:
 *           $ref: '#/components/schemas/UserApartment'
 *         Role:
 *           $ref: '#/components/schemas/Role'
 */

/**
 * @swagger
 * /api/user-apartment-roles/get-all-user-apartment-roles:
 *   get:
 *     summary: Get all user-apartment-role relationships
 *     tags: [User Apartment Roles]
 *     responses:
 *       200:
 *         description: List of all user-apartment-role relationships
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/UserApartmentRole'
 *       500:
 *         description: Internal server error
 */

router.get(
  "/get-all-user-apartment-roles",
  userApartmentRoleController.getAllUserApartmentRoles
);

/**
 * @swagger
 * /api/user-apartment-roles/get-user-apartment-role-by-id/{id}:
 *   get:
 *     summary: Get user-apartment-role relationship by ID
 *     tags: [User Apartment Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: User-Apartment-Role relationship ID
 *     responses:
 *       200:
 *         description: User-apartment-role relationship details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/UserApartmentRole'
 *       404:
 *         description: User-apartment-role relationship not found
 *       500:
 *         description: Internal server error
 */
router.get(
  "/get-user-apartment-role-by-id/:id",
  userApartmentRoleController.getUserApartmentRoleById
);

/**
 * @swagger
 * /api/user-apartment-roles/create-user-apartment-role:
 *   post:
 *     summary: Create a new user-apartment-role relationship
 *     tags: [User Apartment Roles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userApartmentId
 *               - roleId
 *             properties:
 *               userApartmentId:
 *                 type: integer
 *                 description: User-Apartment relationship ID
 *               roleId:
 *                 type: integer
 *                 description: Role ID
 *               isActive:
 *                 type: boolean
 *                 default: true
 *                 description: Whether the role assignment is active
 *     responses:
 *       201:
 *         description: User-apartment-role relationship created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post(
  "/create-user-apartment-role",
  userApartmentRoleController.createUserApartmentRole
);

/**
 * @swagger
 * /api/user-apartment-roles/update-user-apartment-role/{id}:
 *   put:
 *     summary: Update user-apartment-role relationship by ID
 *     tags: [User Apartment Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: User-Apartment-Role relationship ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userApartmentId:
 *                 type: integer
 *               roleId:
 *                 type: integer
 *               isActive:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: User-apartment-role relationship updated successfully
 *       404:
 *         description: User-apartment-role relationship not found
 *       500:
 *         description: Internal server error
 */
router.put(
  "/update-user-apartment-role/:id",
  userApartmentRoleController.updateUserApartmentRole
);

/**
 * @swagger
 * /api/user-apartment-roles/delete-user-apartment-role/{id}:
 *   delete:
 *     summary: Delete user-apartment-role relationship by ID
 *     tags: [User Apartment Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: User-Apartment-Role relationship ID
 *     responses:
 *       200:
 *         description: User-apartment-role relationship deleted successfully
 *       404:
 *         description: User-apartment-role relationship not found
 *       500:
 *         description: Internal server error
 */
router.delete(
  "/delete-user-apartment-role/:id",
  userApartmentRoleController.deleteUserApartmentRole
);

/**
 * @swagger
 * /api/user-apartment-roles/get-roles-by-user-apartment/{userApartmentId}:
 *   get:
 *     summary: Get all roles for a specific user-apartment relationship
 *     tags: [User Apartment Roles]
 *     parameters:
 *       - in: path
 *         name: userApartmentId
 *         required: true
 *         schema:
 *           type: integer
 *         description: User-Apartment relationship ID
 *     responses:
 *       200:
 *         description: List of roles for the user-apartment relationship
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Role'
 *       404:
 *         description: User-apartment relationship not found
 *       500:
 *         description: Internal server error
 */
router.get(
  "/get-roles-by-user-apartment/:userApartmentId",
  userApartmentRoleController.getRolesByUserApartment
);

/**
 * @swagger
 * /api/user-apartment-roles/get-users-by-role-in-apartment/{apartmentId}/{roleId}:
 *   get:
 *     summary: Get all users with a specific role in a specific apartment
 *     tags: [User Apartment Roles]
 *     parameters:
 *       - in: path
 *         name: apartmentId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Apartment ID
 *       - in: path
 *         name: roleId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Role ID
 *     responses:
 *       200:
 *         description: List of users with the specified role in the apartment
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *       404:
 *         description: Apartment or role not found
 *       500:
 *         description: Internal server error
 */
router.get(
  "/get-users-by-role-in-apartment/:apartmentId/:roleId",
  userApartmentRoleController.getUsersByRoleInApartment
);

/**
 * @swagger
 * /api/user-apartment-roles/update-active-status/{userApartmentId}:
 *   put:
 *     summary: Update active status for all roles of a user-apartment relationship
 *     tags: [User Apartment Roles]
 *     parameters:
 *       - in: path
 *         name: userApartmentId
 *         required: true
 *         schema:
 *           type: integer
 *         description: User-Apartment relationship ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - isActive
 *             properties:
 *               isActive:
 *                 type: boolean
 *                 description: Whether to activate or deactivate all roles
 *     responses:
 *       200:
 *         description: Active status updated successfully
 *       404:
 *         description: User-apartment relationship not found
 *       500:
 *         description: Internal server error
 */
router.put(
  "/update-active-status/:userApartmentId",
  userApartmentRoleController.updateActiveStatus
);

/**
 * @swagger
 * /api/user-apartment-roles/delete-by-user-apartment/{userApartmentId}:
 *   delete:
 *     summary: Delete all role assignments for a user-apartment relationship
 *     tags: [User Apartment Roles]
 *     parameters:
 *       - in: path
 *         name: userApartmentId
 *         required: true
 *         schema:
 *           type: integer
 *         description: User-Apartment relationship ID
 *     responses:
 *       200:
 *         description: All role assignments deleted successfully
 *       404:
 *         description: User-apartment relationship not found
 *       500:
 *         description: Internal server error
 */
router.delete(
  "/delete-by-user-apartment/:userApartmentId",
  userApartmentRoleController.deleteByUserApartment
);

export default router;
