import Resident from "../models/Resident.js";
import Household from "../models/Household.js";

// Resident Services
export const getAllResidents = async (apartmentId = null) => {
  if (apartmentId) {
    return await Resident.findAll({
      include: [
        {
          model: Household,
          where: { ApartmentID: apartmentId },
          attributes: ["HouseholdID", "RoomNumber", "ApartmentID"],
        },
      ],
    });
  }
  return await Resident.findAll({
    include: [
      {
        model: Household,
        attributes: ["HouseholdID", "RoomNumber", "ApartmentID"],
      },
    ],
  });
};

export const getResidentById = async (id) => {
  return await Resident.findByPk(id);
};

export const createResident = async (residentData) => {
  return await Resident.create(residentData);
};

export const updateResident = async (id, updateData) => {
  const resident = await Resident.findByPk(id);
  if (!resident) return null;
  await resident.update(updateData);
  return resident;
};

export const deleteResident = async (id) => {
  const resident = await Resident.findByPk(id);
  if (!resident) return null;
  await resident.destroy();
  return true;
};

export const findResidentByName = async (name) => {
  return await Resident.findOne({ where: { FullName: name } });
};
