import UserApartment from "../models/UserApartment.js";
import User from "../models/User.js";
import Apartment from "../models/Apartment.js";

// Lấy tất cả liên kết user-apartment
export const getAllUserApartments = async () => {
  return await UserApartment.findAll({
    include: [
      { model: User, attributes: ["UserID", "Username", "FullName"] },
      { model: Apartment, attributes: ["ApartmentID", "ApartmentName"] },
    ],
  });
};

// Lấy liên kết user-apartment theo ID
export const getUserApartmentById = async (id) => {
  return await UserApartment.findByPk(id, {
    include: [
      { model: User, attributes: ["UserID", "Username", "FullName"] },
      { model: Apartment, attributes: ["ApartmentID", "ApartmentName"] },
    ],
  });
};

// Thêm liên kết user-apartment mới
export const createUserApartment = async (userApartmentData) => {
  // Kiểm tra xem UserID có tồn tại không
  const userExists = await User.findByPk(userApartmentData.UserID);
  if (!userExists) {
    throw new Error(`User with ID ${userApartmentData.UserID} not found`);
  }

  // Kiểm tra xem ApartmentID có tồn tại không
  const apartmentExists = await Apartment.findByPk(
    userApartmentData.ApartmentID
  );
  if (!apartmentExists) {
    throw new Error(
      `Apartment with ID ${userApartmentData.ApartmentID} not found`
    );
  }

  // Kiểm tra xem liên kết đã tồn tại chưa
  const existingLink = await UserApartment.findOne({
    where: {
      UserID: userApartmentData.UserID,
      ApartmentID: userApartmentData.ApartmentID,
    },
  });

  if (existingLink) {
    return existingLink;
  }

  return await UserApartment.create(userApartmentData);
};

// Cập nhật liên kết user-apartment
export const updateUserApartment = async (id, updateData) => {
  const userApartment = await UserApartment.findByPk(id);
  if (!userApartment) return null;
  await userApartment.update(updateData);
  return userApartment;
};

// Xóa liên kết user-apartment
export const deleteUserApartment = async (id) => {
  const userApartment = await UserApartment.findByPk(id);
  if (!userApartment) return null;
  await userApartment.destroy();
  return true;
};

// Lấy apartments của user
export const getApartmentsByUserId = async (userId) => {
  // Kiểm tra xem user có tồn tại không
  const userExists = await User.findByPk(userId);
  if (!userExists) {
    return [];
  }

  return await UserApartment.findAll({
    where: { UserID: userId },
    include: [
      {
        model: Apartment,
        attributes: ["ApartmentID", "ApartmentName", "Phone", "Address"],
      },
    ],
  });
};

// Lấy users của apartment
export const getUsersByApartmentId = async (apartmentId) => {
  return await UserApartment.findAll({
    where: { ApartmentID: apartmentId },
    include: [
      {
        model: User,
        attributes: [
          "UserID",
          "Username",
          "FullName",
          "Email",
          "PhoneNumber",
          "Status",
        ],
      },
    ],
  });
};
