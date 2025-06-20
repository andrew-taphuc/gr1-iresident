import Apartment from "../models/Apartment.js";

// Lấy tất cả chung cư
export const getAllApartments = async () => {
  return await Apartment.findAll();
};

// Lấy chung cư theo ID
export const getApartmentById = async (id) => {
  return await Apartment.findByPk(id);
};

// Thêm chung cư mới
export const createApartment = async (apartmentData) => {
  return await Apartment.create(apartmentData);
};

// Cập nhật chung cư
export const updateApartment = async (id, updateData) => {
  const apartment = await Apartment.findByPk(id);
  if (!apartment) return null;
  await apartment.update(updateData);
  return apartment;
};

// Xóa chung cư
export const deleteApartment = async (id) => {
  const apartment = await Apartment.findByPk(id);
  if (!apartment) return null;
  await apartment.destroy();
  return true;
};
