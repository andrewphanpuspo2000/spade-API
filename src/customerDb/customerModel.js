import customerSchema from "./customerSchema.js";
export const addUser = (user) => {
  return customerSchema(user).save();
};

export const findByFilter = (data) => {
  return customerSchema.findOne(data);
};

export const updateByFilter = (filter, data) => {
  return customerSchema.findOneAndUpdate(filter, data);
};

export const updateById = (id, data) => {
  return customerSchema.findByIdAndUpdate(id, data);
};
