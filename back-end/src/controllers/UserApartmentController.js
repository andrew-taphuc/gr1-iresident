import * as userApartmentService from "../services/UserApartmentServices.js";

// Lấy tất cả liên kết user-apartment
export const getAllUserApartments = async (req, res) => {
  try {
    const userApartments = await userApartmentService.getAllUserApartments();
    res.status(200).json({ error: false, userApartments });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "Error retrieving user apartments",
      error: error.message,
    });
  }
};

// Lấy liên kết user-apartment theo ID
export const getUserApartmentById = async (req, res) => {
  try {
    const userApartment = await userApartmentService.getUserApartmentById(
      req.params.id
    );
    if (!userApartment)
      return res
        .status(404)
        .json({ error: true, message: "UserApartment not found" });
    res.status(200).json({ error: false, userApartment });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "Error retrieving user apartment",
      error: error.message,
    });
  }
};

// Thêm liên kết user-apartment mới
export const createUserApartment = async (req, res) => {
  try {
    const { UserID, ApartmentID } = req.body;

    if (!UserID || !ApartmentID) {
      return res
        .status(400)
        .json({ error: true, message: "UserID and ApartmentID are required" });
    }

    const newUserApartment = await userApartmentService.createUserApartment({
      UserID,
      ApartmentID,
    });

    res.status(201).json({ error: false, userApartment: newUserApartment });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "Error creating user apartment",
      error: error.message,
    });
  }
};

// Cập nhật liên kết user-apartment
export const updateUserApartment = async (req, res) => {
  try {
    const updated = await userApartmentService.updateUserApartment(
      req.params.id,
      req.body
    );
    if (!updated)
      return res
        .status(404)
        .json({ error: true, message: "UserApartment not found" });
    res.status(200).json({ error: false, userApartment: updated });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "Error updating user apartment",
      error: error.message,
    });
  }
};

// Xóa liên kết user-apartment
export const deleteUserApartment = async (req, res) => {
  try {
    const deleted = await userApartmentService.deleteUserApartment(
      req.params.id
    );
    if (!deleted)
      return res
        .status(404)
        .json({ error: true, message: "UserApartment not found" });
    res
      .status(200)
      .json({ error: false, message: "UserApartment deleted successfully" });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "Error deleting user apartment",
      error: error.message,
    });
  }
};

// Lấy apartments của user
export const getApartmentsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const apartments = await userApartmentService.getApartmentsByUserId(userId);

    res.status(200).json({ error: false, apartments });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "Error retrieving user apartments",
      error: error.message,
    });
  }
};

// Lấy users của apartment
export const getUsersByApartmentId = async (req, res) => {
  try {
    const { apartmentId } = req.params;
    const userApartments = await userApartmentService.getUsersByApartmentId(
      apartmentId
    );
    res.status(200).json({ error: false, userApartments });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "Error retrieving apartment users",
      error: error.message,
    });
  }
};
