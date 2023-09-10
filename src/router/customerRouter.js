import express from "express";
import { addUser, findByFilter } from "../customerDb/customerModel.js";
import { v4 as uuidv4 } from "uuid";
const router = express.Router();

router.post("/addUser", async (req, res, next) => {
  try {
    const { email } = req.body;
    const checkEmail = await findByFilter({ email });
    if (!checkEmail) {
      const result = await addUser(req.body);
      if (result) {
        res.json({
          status: "success",
          message:
            "Account has been added, please check your account to activate it",
        });
      }
    } else {
      return res.json({
        status: "error",
        message: "Email has been used",
      });
    }
  } catch (error) {
    next(error);
  }
});

export default router;
