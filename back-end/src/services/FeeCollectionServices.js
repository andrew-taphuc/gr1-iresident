import FeeCollection from "../models/FeeCollection.js";
import FeeType from "../models/FeeType.js";

// Lấy tất cả đợt thu phí
export const getAllFeeCollections = async (apartmentId = null) => {
  const includeOptions = {
    model: FeeType,
    attributes: ["FeeTypeName", "Category", "Scope", "UnitPrice"],
  };

  if (apartmentId) {
    includeOptions.where = { ApartmentID: apartmentId };
  }

  return await FeeCollection.findAll({
    include: includeOptions,
    order: [["StartDate", "DESC"]], // Sắp xếp theo ngày bắt đầu mới nhất
  });
};

// Lấy đợt thu phí theo ID
export const getFeeCollectionById = async (id) => {
  return await FeeCollection.findByPk(id);
};

// Thêm đợt thu phí mới
export const createFeeCollection = async (data) => {
  const created = await FeeCollection.create(data);
  // Lấy lại bản ghi kèm FeeType
  return await FeeCollection.findByPk(created.CollectionID, {
    include: {
      model: FeeType,
      attributes: ["FeeTypeName", "Category", "Scope", "UnitPrice"],
    },
  });
};

// Cập nhật đợt thu phí
export const updateFeeCollection = async (id, data) => {
  const feeCollection = await FeeCollection.findByPk(id);
  if (!feeCollection) return null;
  await feeCollection.update(data);
  return feeCollection;
};

// Xóa đợt thu phí
export const deleteFeeCollection = async (id) => {
  const feeCollection = await FeeCollection.findByPk(id);
  if (!feeCollection) return null;
  await feeCollection.destroy();
  return true;
};
