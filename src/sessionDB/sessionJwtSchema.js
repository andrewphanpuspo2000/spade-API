import mongoose, { mongo } from "mongoose";

const sessionSchema = mongoose.Schema({
  token: {
    type: String,
    default: "",
  },
  associate: {
    type: String,
    default: "",
  },
});

export default mongoose.model("Customer_Session", sessionSchema);
