import express from "express";
import * as userApartmentController from "../controllers/UserApartmentController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: User Apartments
 *   description: User-Apartment relationship management endpoints
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserApartment:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         userId:
 *           type: integer
 *         apartmentId:
 *           type: integer
 *         isActive:
 *           type: boolean
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *         User:
 *           $ref: '#/components/schemas/User'
 *         Apartment:
 *           $ref: '#/components/schemas/Apartment'
 */

/**
 * @swagger
 * /api/user-apartments/get-all-user-apartments:
 *   get:
 *     summary: Get all user-apartment relationships
 *     tags: [User Apartments]
 *     responses:
 *       200:
 *         description: List of all user-apartment relationships
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
 *                     $ref: '#/components/schemas/UserApartment'
 *       500:
 *         description: Internal server error
 */

router.get(
  "/get-all-user-apartments",
  userApartmentController.getAllUserApartments
);

/**
 * @swagger
 * /api/user-apartments/get-user-apartment-by-id/{id}:
 *   get:
 *     summary: Get user-apartment relationship by ID
 *     tags: [User Apartments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: User-Apartment relationship ID
 *     responses:
 *       200:
 *         description: User-apartment relationship details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/UserApartment'
 *       404:
 *         description: User-apartment relationship not found
 *       500:
 *         description: Internal server error
 */
router.get(
  "/get-user-apartment-by-id/:id",
  userApartmentController.getUserApartmentById
);

/**
 * @swagger
 * /api/user-apartments/create-user-apartment:
 *   post:
 *     summary: Create a new user-apartment relationship
 *     tags: [User Apartments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - apartmentId
 *             properties:
 *               userId:
 *                 type: integer
 *                 description: User ID
 *               apartmentId:
 *                 type: integer
 *                 description: Apartment ID
 *               isActive:
 *                 type: boolean
 *                 default: true
 *                 description: Whether the relationship is active
 *     responses:
 *       201:
 *         description: User-apartment relationship created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post(
  "/create-user-apartment",
  userApartmentController.createUserApartment
);

/**
 * @swagger
 * /api/user-apartments/update-user-apartment/{id}:
 *   put:
 *     summary: Update user-apartment relationship by ID
 *     tags: [User Apartments]
 *     parameters:
 *       - in: path
 *         name: id
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
 *             properties:
 *               userId:
 *                 type: integer
 *               apartmentId:
 *                 type: integer
 *               isActive:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: User-apartment relationship updated successfully
 *       404:
 *         description: User-apartment relationship not found
 *       500:
 *         description: Internal server error
 */
router.put(
  "/update-user-apartment/:id",
  userApartmentController.updateUserApartment
);

/**
 * @swagger
 * /api/user-apartments/delete-user-apartment/{id}:
 *   delete:
 *     summary: Delete user-apartment relationship by ID
 *     tags: [User Apartments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: User-Apartment relationship ID
 *     responses:
 *       200:
 *         description: User-apartment relationship deleted successfully
 *       404:
 *         description: User-apartment relationship not found
 *       500:
 *         description: Internal server error
 */
router.delete(
  "/delete-user-apartment/:id",
  userApartmentController.deleteUserApartment
);

/**
 * @swagger
 * /api/user-apartments/get-apartments-by-user/{userId}:
 *   get:
 *     summary: Get all apartments for a specific user
 *     tags: [User Apartments]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *     responses:
 *       200:
 *         description: List of apartments for the user
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
 *                     $ref: '#/components/schemas/Apartment'
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.get(
  "/get-apartments-by-user/:userId",
  userApartmentController.getApartmentsByUserId
);

/**
 * @swagger
 * /api/user-apartments/get-users-by-apartment/{apartmentId}:
 *   get:
 *     summary: Get all users for a specific apartment
 *     tags: [User Apartments]
 *     parameters:
 *       - in: path
 *         name: apartmentId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Apartment ID
 *     responses:
 *       200:
 *         description: List of users for the apartment
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
 *         description: Apartment not found
 *       500:
 *         description: Internal server error
 */
router.get(
  "/get-users-by-apartment/:apartmentId",
  userApartmentController.getUsersByApartmentId
);

export default router;
