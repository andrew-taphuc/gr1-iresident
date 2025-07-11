import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import sequelize from "./src/config/dbsetup.js";
import swaggerSpecs from "./src/config/swagger.js";
import { createDefaultUser } from "./src/utils/createDefaultUser.js";
import { createDefaultRoles } from "./src/utils/createDefaultRoles.js";

// Model
import User from "./src/models/User.js";
import Household from "./src/models/Household.js";
import Vehicle from "./src/models/Vehicle.js";
import FeeCollection from "./src/models/FeeCollection.js";
import FeeDetail from "./src/models/FeeDetail.js";
import FeeType from "./src/models/FeeType.js";
import Resident from "./src/models/Resident.js";
import Apartment from "./src/models/Apartment.js";
import UserApartment from "./src/models/UserApartment.js";
import UserApartmentRole from "./src/models/UserApartmentRole.js";
import Role from "./src/models/Role.js";

// import routes
import UserRoutes from "./src/routes/UserRoutes.js";
import HouseholdRoutes from "./src/routes/HouseholdRoutes.js";
import ResidentRoutes from "./src/routes/ResidentRoutes.js";
import FeeTypeRoutes from "./src/routes/FeeTypeRoutes.js";
import FeeDetailRoutes from "./src/routes/FeeDetailRoutes.js";
import FeeCollectionRoutes from "./src/routes/FeeCollectionRoutes.js";
import VehicleRoutes from "./src/routes/VehicleRoutes.js";
import ApartmentRoutes from "./src/routes/ApartmentRoutes.js";
import UserApartmentRoutes from "./src/routes/UserApartmentRoutes.js";
import RoleRoutes from "./src/routes/RoleRoutes.js";
import UserApartmentRoleRoutes from "./src/routes/UserApartmentRoleRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Accepct all origins
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));

// Swagger Documentation
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpecs, {
    customCss: ".swagger-ui .topbar { display: none }",
    customSiteTitle: "iResident API Documentation",
  })
);

// Test route
app.get("/", (req, res) => {
  res.json({
    message: "iResident API is running...",
    documentation: "Visit /api-docs for API documentation",
  });
});

// Routes
app.use("/api/users", UserRoutes);
app.use("/api/households", HouseholdRoutes);
app.use("/api/residents", ResidentRoutes);
app.use("/api/fee-type", FeeTypeRoutes);
app.use("/api/fee-detail", FeeDetailRoutes);
app.use("/api/fee-collection", FeeCollectionRoutes);
app.use("/api/vehicle", VehicleRoutes);
app.use("/api/apartments", ApartmentRoutes);
app.use("/api/user-apartments", UserApartmentRoutes);
app.use("/api/roles", RoleRoutes);
app.use("/api/user-apartment-roles", UserApartmentRoleRoutes);

// Tạo bảng và chạy server
(async () => {
  try {
    // Đồng bộ hóa database
    // await sequelize.sync(); // tạo bảng nếu chưa có
    // await sequelize.sync({ alter: true }); // tự động cập nhật bảng nếu có thay đổi trong model
    // await sequelize.sync({ force: true }); // xóa bảng và tạo lại - dùng khi cần làm mới cơ sở dữ liệu, sẽ bị mất dữ liệu

    // Tạo người dùng mặc định
    // await createDefaultUser();

    // Tạo các role mặc định
    await createDefaultRoles();

    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Lỗi khởi động server:", error);
  }
})();
