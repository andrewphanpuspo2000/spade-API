import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    status: {
      type: String,
      default: "pending",
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
      type: String,
      required: true,
      index: 1,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    items: [
      {
        name: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        _id: {
          type: String,
          required: true,
        },
        totalPrice: {
          type: Number,
          required: true,
        },
        qty: {
          type: Number,
          required: true,
        },
      },
    ],
    customerId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("order", orderSchema);
