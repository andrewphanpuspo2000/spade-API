import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import mongodb from "./src/config/mongoDb.js";
dotenv.config();
mongodb();
const app = express();
const PORT = 8001;
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

app.use((error, req, res, next) => {
  const code = error.statusCode || 500;
  res.json({
    status: "error",
    message: error.message,
  });
});

app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "server is running",
  });
});

app.listen(PORT, (err) => {
  err ? console.log(err.message) : console.log(`Server is run in Port ${PORT}`);
});
