import express from "express";
import {
  addUser,
  findByFilter,
  updateByFilter,
  updateById,
} from "../customerDb/customerModel.js";
// import { v4 as uuidv4 } from "uuid";
import { accountVerificationEmail } from "../helper/nodemailer.js";
import isOnline from "is-online";
import { comparePass, encryptPass } from "../encrypt/bycrpt.js";
import { createAccessJWT, createRefreshJWT } from "../JWT/jwtAction.js";
import { auth, newAccessJWT } from "../authMiddleware/auth.js";
import { deleteSession } from "../sessionDB/sessionJwtModel.js";
const router = express.Router();

router.post("/addUser", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const checkEmail = await findByFilter({ email });
    if (!checkEmail) {
      const verifCode = 123; //uuid
      req.body.password = encryptPass(password);
      req.body.verificationCode = verifCode;
      const online = await isOnline();
      if (online) {
        const result = await addUser(req.body);
        if (result._id) {
          console.log(result);
          const link = `${process.env.WEB_DOMAIN}/account-verification?c=${result.verificationCode}&e=${result.email}`;
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

router.post("/verifyUser", async (req, res, next) => {
  try {
    const update = await updateByFilter(req.body, {
      isVerified: true,
      verificationCode: "",
      status: "active",
    });
    console.log(update?._id);
    if (update?._id) {
      return res.json({
        status: "success",
        message: "Congratulation, your account has been verified",
      });
    } else {
      return res.json({
        status: "error",
        message: "Account can not be verified twice",
      });
    }
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userCheck = await findByFilter({ email });
    if (userCheck?._id) {
      const checkPassword = comparePass(password, userCheck.password);
      if (checkPassword) {
        const sessionJWT = await createAccessJWT(email);
        const refreshJWT = await createRefreshJWT(email);
        return res.json({
          status: "success",
          message: "success Login",
          sessionJWT,
          refreshJWT,
        });
      } else {
        res.json({
          status: "error",
          message: "Password is incorrect,please try again",
        });
      }
    } else {
      return res.json({
        status: "error",
        message: "Email is not found",
      });
    }
  } catch (error) {
    return next(error);
  }
});

router.get("/getUserInfo", auth, (req, res, next) => {
  try {
    return res.json({
      status: "success",
      user: req.userInfo,
    });
  } catch (err) {
    next(err);
  }
});

router.get("/getAccessJWT", newAccessJWT);

router.post("/signout", async (req, res, next) => {
  try {
    const { _id, accessJWT, refreshJWT } = req.body;
    if (_id && refreshJWT) await updateById(_id, { refreshJWT: "" });

    if (result?._id) {
      await deleteSession({ accessJWT });
    }
  } catch (error) {
    next(error);
  }
});

export default router;
