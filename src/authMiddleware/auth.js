import {
  createAccessJWT,
  verifyAccessJWT,
  verifyRefreshJWT,
} from "../JWT/jwtAction.js";
import { findByFilter } from "../customerDb/customerModel.js";

export const auth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    const verifyJWT = await verifyAccessJWT(authorization);

    if (verifyJWT?.email) {
      const user = await findByFilter({ email: verifyJWT.email });
      if (user._id ) {
        user.password = undefined;
        user.refreshJWT = undefined;
        req.userInfo = user;
        return next();
      }
    }
  } catch (err) {
    if (err?.message?.includes("jwt expired")) {
      err.message = "jwt expired";
      err.statusCode = 401;
    }
    if (err?.message?.includes("invalid signature")) {
      err.message = "invalid signature";
      err.statusCode = 401;
    }
    return next(err);
  }
};

export const newAccessJWT = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    const verifyJWT = await verifyRefreshJWT(authorization);
    console.log(this);
    if (verifyJWT?.email) {
      const user = await findByFilter({
        email: verifyJWT.email,
        refreshJWT: authorization,
      });
      if (user?._id) {
        const accessJWT = await createAccessJWT(user?.email);
        if (accessJWT) {
          return res.json({
            status: "success",
            accessJWT,
          });
        }
      }
    }
  } catch (err) {
    next(err);
  }
};
