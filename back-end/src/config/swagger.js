import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "iResident API Documentation",
      version: "1.0.0",
      description:
        "API documentation for iResident - Residential Management System",
      contact: {
        name: "iResident Team",
        email: "support@iresident.com",
      },
      license: {
        name: "MIT",
        url: "https://opensource.org/licenses/MIT",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
      {
        url: "https://api.iresident.com",
        description: "Production server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        User: {
          type: "object",
          properties: {
            id: { type: "integer" },
            username: { type: "string" },
            email: { type: "string", format: "email" },
            password: { type: "string" },
            fullName: { type: "string" },
            phone: { type: "string" },
            status: { type: "string", enum: ["active", "inactive"] },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        Household: {
          type: "object",
          properties: {
            id: { type: "integer" },
            householdNumber: { type: "string" },
            apartmentId: { type: "integer" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        Resident: {
          type: "object",
          properties: {
            id: { type: "integer" },
            fullName: { type: "string" },
            dateOfBirth: { type: "string", format: "date" },
            gender: { type: "string", enum: ["male", "female", "other"] },
            phone: { type: "string" },
            email: { type: "string", format: "email" },
            householdId: { type: "integer" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        Apartment: {
          type: "object",
          properties: {
            id: { type: "integer" },
            apartmentNumber: { type: "string" },
            floor: { type: "integer" },
            area: { type: "number" },
            status: {
              type: "string",
              enum: ["occupied", "vacant", "maintenance"],
            },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        Vehicle: {
          type: "object",
          properties: {
            id: { type: "integer" },
            licensePlate: { type: "string" },
            vehicleType: {
              type: "string",
              enum: ["car", "motorcycle", "bicycle"],
            },
            brand: { type: "string" },
            model: { type: "string" },
            color: { type: "string" },
            residentId: { type: "integer" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        FeeType: {
          type: "object",
          properties: {
            id: { type: "integer" },
            name: { type: "string" },
            description: { type: "string" },
            amount: { type: "number" },
            frequency: {
              type: "string",
              enum: ["monthly", "quarterly", "yearly", "one-time"],
            },
            status: { type: "string", enum: ["active", "inactive"] },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        FeeDetail: {
          type: "object",
          properties: {
            id: { type: "integer" },
            feeTypeId: { type: "integer" },
            apartmentId: { type: "integer" },
            amount: { type: "number" },
            dueDate: { type: "string", format: "date" },
            status: { type: "string", enum: ["pending", "paid", "overdue"] },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        FeeCollection: {
          type: "object",
          properties: {
            id: { type: "integer" },
            feeDetailId: { type: "integer" },
            amount: { type: "number" },
            paymentDate: { type: "string", format: "date-time" },
            paymentMethod: {
              type: "string",
              enum: ["cash", "bank_transfer", "credit_card"],
            },
            status: {
              type: "string",
              enum: ["pending", "completed", "failed"],
            },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        Role: {
          type: "object",
          properties: {
            id: { type: "integer" },
            name: { type: "string" },
            description: { type: "string" },
            permissions: { type: "string" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        UserApartment: {
          type: "object",
          properties: {
            id: { type: "integer" },
            userId: { type: "integer" },
            apartmentId: { type: "integer" },
            isActive: { type: "boolean" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
            User: { $ref: "#/components/schemas/User" },
            Apartment: { $ref: "#/components/schemas/Apartment" },
          },
        },
        UserApartmentRole: {
          type: "object",
          properties: {
            id: { type: "integer" },
            userApartmentId: { type: "integer" },
            roleId: { type: "integer" },
            isActive: { type: "boolean" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
            UserApartment: { $ref: "#/components/schemas/UserApartment" },
            Role: { $ref: "#/components/schemas/Role" },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.js", "./src/controllers/*.js", "./index.js"],
};

const specs = swaggerJsdoc(options);

export default specs;
