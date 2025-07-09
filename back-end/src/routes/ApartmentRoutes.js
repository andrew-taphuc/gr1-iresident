import express from "express";
import * as apartmentController from "../controllers/ApartmentController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Apartments
 *   description: Apartment management endpoints
 */

/**
 * @swagger
 * /api/apartments/get-all-apartments:
 *   get:
 *     summary: Get all apartments
 *     tags: [Apartments]
 *     responses:
 *       200:
 *         description: List of all apartments
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
 *       500:
 *         description: Internal server error
 */

router.get("/get-all-apartments", apartmentController.getAllApartments);

/**
 * @swagger
 * /api/apartments/get-apartment-by-id/{id}:
 *   get:
 *     summary: Get apartment by ID
 *     tags: [Apartments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Apartment ID
 *     responses:
 *       200:
 *         description: Apartment details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Apartment'
 *       404:
 *         description: Apartment not found
 *       500:
 *         description: Internal server error
 */
router.get("/get-apartment-by-id/:id", apartmentController.getApartmentById);

/**
 * @swagger
 * /api/apartments/create-apartment:
 *   post:
 *     summary: Create a new apartment
 *     tags: [Apartments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - apartmentNumber
 *               - floor
 *               - area
 *             properties:
 *               apartmentNumber:
 *                 type: string
 *               floor:
 *                 type: integer
 *               area:
 *                 type: number
 *               status:
 *                 type: string
 *                 enum: [occupied, vacant, maintenance]
 *     responses:
 *       201:
 *         description: Apartment created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post("/create-apartment", apartmentController.createApartment);

/**
 * @swagger
 * /api/apartments/update-apartment/{id}:
 *   put:
 *     summary: Update apartment by ID
 *     tags: [Apartments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               apartmentNumber:
 *                 type: string
 *               floor:
 *                 type: integer
 *               area:
 *                 type: number
 *               status:
 *                 type: string
 *                 enum: [occupied, vacant, maintenance]
 *     responses:
 *       200:
 *         description: Apartment updated successfully
 *       404:
 *         description: Apartment not found
 *       500:
 *         description: Internal server error
 */
router.put("/update-apartment/:id", apartmentController.updateApartment);

/**
 * @swagger
 * /api/apartments/delete-apartment/{id}:
 *   delete:
 *     summary: Delete apartment by ID
 *     tags: [Apartments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Apartment deleted successfully
 *       404:
 *         description: Apartment not found
 *       500:
 *         description: Internal server error
 */
router.delete("/delete-apartment/:id", apartmentController.deleteApartment);

export default router;
