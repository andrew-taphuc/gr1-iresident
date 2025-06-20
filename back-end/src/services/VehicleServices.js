import Vehicle from "../models/Vehicle.js";
import Household from "../models/Household.js";

// Lấy tất cả phương tiện
export const getAllVehicles = async (apartmentId = null) => {
  if (apartmentId) {
    return await Vehicle.findAll({
      include: [
        {
          model: Household,
          where: { ApartmentID: apartmentId },
          attributes: ["HouseholdID", "RoomNumber", "ApartmentID"],
        },
      ],
    });
  }
  return await Vehicle.findAll({
    include: [
      {
        model: Household,
        attributes: ["HouseholdID", "RoomNumber", "ApartmentID"],
      },
    ],
  });
};

// Lấy phương tiện theo ID
export const getVehicleById = async (id) => {
  return await Vehicle.findByPk(id);
};

// Thêm phương tiện mới
export const createVehicle = async (data) => {
  return await Vehicle.create(data);
};

// Cập nhật phương tiện
export const updateVehicle = async (id, data) => {
  const vehicle = await Vehicle.findByPk(id);
  if (!vehicle) return null;
  await vehicle.update(data);
  return vehicle;
};

// Xóa phương tiện
export const deleteVehicle = async (id) => {
  const vehicle = await Vehicle.findByPk(id);
  if (!vehicle) return null;
  await vehicle.destroy();
  return true;
};
