import orderSchema from "./orderSchema.js";

export const addOrder = (order) => {
  return orderSchema(order).save();
};
