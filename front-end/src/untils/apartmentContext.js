// Utility functions để quản lý apartment context
import axiosInstance from "./axiosIntance";

export const getSelectedApartmentId = () => {
  return localStorage.getItem("selectedApartmentId");
};

export const getSelectedApartmentName = () => {
  return localStorage.getItem("selectedApartmentName");
};

export const setSelectedApartment = (apartmentId, apartmentName) => {
  localStorage.setItem("selectedApartmentId", apartmentId);
  localStorage.setItem("selectedApartmentName", apartmentName);
};

export const clearSelectedApartment = () => {
  localStorage.removeItem("selectedApartmentId");
  localStorage.removeItem("selectedApartmentName");
  localStorage.removeItem("role"); // Clear role khi clear apartment
};

export const hasSelectedApartment = () => {
  return !!getSelectedApartmentId();
};

// Hàm để refresh role của user trong apartment hiện tại
export const refreshUserRole = async () => {
  try {
    const userId = localStorage.getItem("id");
    const apartmentId = getSelectedApartmentId();

    if (!userId || !apartmentId) {
      localStorage.setItem("role", "Cư dân");
      return "Cư dân";
    }

    // Lấy thông tin user-apartment
    const userApartmentResponse = await axiosInstance.get(
      `/user-apartments/get-apartments-by-user/${userId}`
    );

    if (
      userApartmentResponse.data.error === false &&
      userApartmentResponse.data.apartments
    ) {
      // Tìm apartment hiện tại
      const currentUserApartment = userApartmentResponse.data.apartments.find(
        (ua) => ua.Apartment.ApartmentID.toString() === apartmentId.toString()
      );

      if (currentUserApartment) {
        // Lấy role của user trong apartment này
        const roleResponse = await axiosInstance.get(
          `/user-apartment-roles/get-roles-by-user-apartment/${currentUserApartment.UserApartmentID}`
        );

        if (
          roleResponse.data.error === false &&
          roleResponse.data.roles &&
          roleResponse.data.roles.length > 0
        ) {
          const activeRole = roleResponse.data.roles.find(
            (role) => role.IsActive === true
          );
          if (activeRole && activeRole.Role) {
            localStorage.setItem("role", activeRole.Role.RoleName);
            return activeRole.Role.RoleName;
          }
        }
      }
    }

    // Nếu không tìm thấy role cụ thể, set mặc định
    localStorage.setItem("role", "Cư dân");
    return "Cư dân";
  } catch (error) {
    console.error("Error refreshing user role:", error);
    localStorage.setItem("role", "Cư dân");
    return "Cư dân";
  }
};

// Hàm để lấy role hiện tại
export const getCurrentUserRole = () => {
  return localStorage.getItem("role") || "Cư dân";
};

// Hàm để thêm apartmentId vào request headers
export const getApartmentHeaders = () => {
  const apartmentId = getSelectedApartmentId();
  return apartmentId ? { "X-Apartment-ID": apartmentId } : {};
};

// Hàm để tạo axios config với apartment context
export const createApartmentConfig = (config = {}) => {
  const apartmentId = getSelectedApartmentId();
  if (apartmentId) {
    config.headers = {
      ...config.headers,
      "X-Apartment-ID": apartmentId,
    };
  }
  return config;
};
