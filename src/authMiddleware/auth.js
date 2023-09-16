import { verifyAccessJWT } from "../JWT/jwtAction.js";
import { findByFilter } from "../customerDb/customerModel.js";

export const auth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    const verifyJWT = await verifyAccessJWT(authorization);

    if (verifyJWT?.email) {
      const user = await findByFilter({ email: verifyJWT.email });
      if (user._id) {
        user.password = undefined;
        user.refreshJWT = undefined;
        req.body.userInfo = user;
        return next();
      }
    }
  } catch (err) {
    return next();
  }
};
