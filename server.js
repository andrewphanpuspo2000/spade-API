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
import categoryRouter from "./src/router/categoryRouter.js";
app.use("/customer/api/v1/category", categoryRouter);
app.use((error, req, res, next) => {
  const code = error.statusCode || 500;
  res.status(code).json({
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
