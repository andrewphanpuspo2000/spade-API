import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import morgan from "morgan";
import mongodb from "./src/config/mongoDb.js";
import mongoose from "mongoose";
mongodb();
const app = express();
const PORT = process.env.PORT || 8001;
app.use(express.json());
app.use(cors());
app.use(morgan());
//import router end point
import categoryRouter from "./src/router/categoryRouter.js";
app.use("/store/api/v1/category", categoryRouter);
import customerRouter from "./src/router/customerRouter.js";
app.use("/store/api/v1/customer", customerRouter);
import methods from "./src/router/paymentRouter.js";
app.use("/store/api/v1/payments", methods);
import order from "./src/router/orderRouter.js";
app.use("/store/api/v1/order", order);

await mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("success");
});

app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "server is running",
  });
});

app.use((error, req, res, next) => {
  const code = error.statusCode || 500;
  console.log("this is error from server next error:", error);
  res.status(code).json({
    status: "error",
    message: error.message,
  });
});

app.listen(PORT, (err) => {
  err ? console.log(err.message) : console.log(`Server is run in Port ${PORT}`);
});
