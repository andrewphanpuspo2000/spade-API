import mongoose from "mongoose";

const customerSchema = mongoose.Schema(
  {
    status: {
      type: String,
      default: "inActive",
    },
    fName: {
      type: String,
      required: true,
    },
    lName: {
      type: String,
      required: true,
    },
    email: {
      unique: true,
      type: String,
      required: true,
      index: 1,
    },
    password: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    refreshJWT: {
      type: String,
      default: "",
    },
    verificationCode: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("customer", customerSchema);
