import mongoose from "mongoose";
const categorySchema = mongoose.model("categories", {});
const productSchema = mongoose.model("products", {});

export const getAllCategories = () => {
  return categorySchema.find();
};

export const getCatItems = (id) => {
  const _id = new mongoose.Types.ObjectId(id);
  return productSchema.find({ parentCat: _id });
};
export const getOneCatItem = (id) => {
  return productSchema.findById(id).then((data) => {
    if (!data) {
      throw new Error("no data");
    }
    return data;
  });
};
