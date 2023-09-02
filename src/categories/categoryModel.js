import mongoose from "mongoose";
const categorySchema = mongoose.model("categories", {});

export const getAllCategories = () => {
  return categorySchema.find();
};
