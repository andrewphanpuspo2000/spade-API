import mongoose from "mongoose";

const paymentDb = mongoose.model("paymentmethods", {});

export const getPaymentMethods = () => {
  return paymentDb.find();
};
