import express from "express";
import * as userApartmentController from "../controllers/UserApartmentController.js";

const router = express.Router();

router.get(
  "/get-all-user-apartments",
  userApartmentController.getAllUserApartments
);
router.get(
  "/get-user-apartment-by-id/:id",
  userApartmentController.getUserApartmentById
);
router.post(
  "/create-user-apartment",
  userApartmentController.createUserApartment
);
router.put(
  "/update-user-apartment/:id",
  userApartmentController.updateUserApartment
);
router.delete(
  "/delete-user-apartment/:id",
  userApartmentController.deleteUserApartment
);
router.get(
  "/get-apartments-by-user/:userId",
  userApartmentController.getApartmentsByUserId
);
router.get(
  "/get-users-by-apartment/:apartmentId",
  userApartmentController.getUsersByApartmentId
);

export default router;
