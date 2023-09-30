import mongoose from "mongoose";

const mongoDBConnect = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URL);
    connect
      ? console.log("mongo db is connected")
      : console.log("mongo db is not connected");
  } catch (err) {
    console.log(err.message);
  }
};

export default mongoDBConnect;
