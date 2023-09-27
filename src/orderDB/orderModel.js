import orderSchema from "./orderSchema.js";
// const productSchema = mongoose.model("products", {});
export const addOrder = (order) => {
  return orderSchema(order).save();
};

export const findAllOrder = () => {
  return orderSchema.find();
};
export const findAllOrderByFilter = (data) => {
  return orderSchema.find(data);
};
export const findOrderById = (id) => {
  return orderSchema.findById(id);
};

export const deleteOrderById = (id) => {
  return orderSchema.findByIdAndDelete(id);
};
