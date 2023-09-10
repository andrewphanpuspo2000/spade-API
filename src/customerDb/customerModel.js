import customerSchema from "./customerSchema.js";
export const addUser = (user) => {
  return customerSchema(user).save();
};

export const findByFilter = (data) => {
  return customerSchema.findOne(data);
};
