import express from "express";
import * as apartmentController from "../controllers/ApartmentController.js";

const router = express.Router();

router.get("/get-all-apartments", apartmentController.getAllApartments);
router.get("/get-apartment-by-id/:id", apartmentController.getApartmentById);
router.post("/create-apartment", apartmentController.createApartment);
router.put("/update-apartment/:id", apartmentController.updateApartment);
router.delete("/delete-apartment/:id", apartmentController.deleteApartment);

export default router;
