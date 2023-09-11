import express from "express";
import { addUser, findByFilter } from "../customerDb/customerModel.js";
import { v4 as uuidv4 } from "uuid";
import { accountVerificationEmail } from "../helper/nodemailer.js";
import isOnline from "is-online";
const router = express.Router();

router.post("/addUser", async (req, res, next) => {
  try {
    const { email } = req.body;
    const checkEmail = await findByFilter({ email });
    if (!checkEmail) {
      const verifCode = uuidv4();
      req.body.verificationCode = verifCode;
      const online = await isOnline();
      if (online) {
        const result = await addUser(req.body);
        if (result._id) {
          console.log(result);
          const link = `${process.env.WEB_DOMAIN}/user-verification?c=${result.verificationCode}&e=${result.email}`;
          const sendEmail = await accountVerificationEmail({
            fName: result.fName,
            email: result.email,
            link,
          });
          res.json({
            status: "success",
            message:
              "Account has been added, please check your account to activate it",
          });
        }
      } else {
        return res.json({
          status: "error",
          message:
            " You are offline, please turn on your internet connection to create account",
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
