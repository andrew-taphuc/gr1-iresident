import axios from "axios";
import { BASE_URL } from "./constants";
import { getSelectedApartmentId } from "./apartmentContext.js";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    // Thêm apartment ID vào headers cho multi-tenant
    const apartmentId = getSelectedApartmentId();
    if (apartmentId) {
      config.headers["X-Apartment-ID"] = apartmentId;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
