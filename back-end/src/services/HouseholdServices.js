import Household from "../models/Household.js";

//CRUD household
export const getAllHouseholds = async (apartmentId = null) => {
  const whereClause = apartmentId ? { ApartmentID: apartmentId } : {};
  return await Household.findAll({ where: whereClause });
};

export const getHouseholdById = async (id) => {
  return await Household.findByPk(id);
};

export const createHousehold = async (householdData) => {
  try {
    console.log("createHousehold service - Creating with data:", householdData);

    // Kiểm tra xem phòng đã tồn tại chưa
    const existingHousehold = await Household.findOne({
      where: {
        ApartmentID: householdData.ApartmentID,
        RoomNumber: householdData.RoomNumber,
      },
    });

    if (existingHousehold) {
      console.log(
        "createHousehold service - Room already exists:",
        existingHousehold
      );
      throw new Error(
        `Room ${householdData.RoomNumber} already exists in this apartment`
      );
    }

    const result = await Household.create(householdData);
    console.log("createHousehold service - Success:", result);
    return result;
  } catch (error) {
    console.error("createHousehold service - Error:", error);
    console.error("createHousehold service - Error stack:", error.stack);
    throw error;
  }
};

export const updateHousehold = async (id, updateData) => {
  const household = await Household.findByPk(id);
  if (!household) return null;
  await household.update(updateData);
  return household;
};

export const deleteHousehold = async (id) => {
  const household = await Household.findByPk(id);
  if (!household) return null;
  await household.destroy();
  return true;
};

export const findHouseholdByRoomNumber = async (roomNumber) => {
  return await Household.findOne({ where: { RoomNumber: roomNumber } });
};
