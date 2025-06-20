import * as apartmentService from "../services/ApartmentServices.js";

// Lấy tất cả chung cư
export const getAllApartments = async (req, res) => {
  try {
    const apartments = await apartmentService.getAllApartments();
    res.status(200).json({ error: false, apartments });
  } catch (error) {
    res
      .status(500)
      .json({ error: true, message: "Error retrieving apartments", error });
  }
};

// Lấy chung cư theo ID
export const getApartmentById = async (req, res) => {
  try {
    const apartment = await apartmentService.getApartmentById(req.params.id);
    if (!apartment)
      return res
        .status(404)
        .json({ error: true, message: "Apartment not found" });
    res.status(200).json({ error: false, apartment });
  } catch (error) {
    res
      .status(500)
      .json({ error: true, message: "Error retrieving apartment", error });
  }
};

// Thêm chung cư mới
export const createApartment = async (req, res) => {
  try {
    const { ApartmentName, Phone, Address } = req.body;
    if (!ApartmentName) {
      return res
        .status(400)
        .json({ error: true, message: "ApartmentName is required" });
    }
    const newApartment = await apartmentService.createApartment({
      ApartmentName,
      Phone,
      Address,
    });
    res.status(201).json({ error: false, apartment: newApartment });
  } catch (error) {
    res
      .status(500)
      .json({ error: true, message: "Error creating apartment", error });
  }
};

// Cập nhật chung cư
export const updateApartment = async (req, res) => {
  try {
    const updated = await apartmentService.updateApartment(
      req.params.id,
      req.body
    );
    if (!updated)
      return res
        .status(404)
        .json({ error: true, message: "Apartment not found" });
    res.status(200).json({ error: false, apartment: updated });
  } catch (error) {
    res
      .status(500)
      .json({ error: true, message: "Error updating apartment", error });
  }
};

// Xóa chung cư
export const deleteApartment = async (req, res) => {
  try {
    const deleted = await apartmentService.deleteApartment(req.params.id);
    if (!deleted)
      return res
        .status(404)
        .json({ error: true, message: "Apartment not found" });
    res
      .status(200)
      .json({ error: false, message: "Apartment deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: true, message: "Error deleting apartment", error });
  }
};
