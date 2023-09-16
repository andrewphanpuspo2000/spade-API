import jsonwebtoken from "jsonwebtoken";
import { addSessionToken } from "../sessionDB/sessionJwtModel.js";
import { updateByFilter } from "../customerDb/customerModel.js";

export const createAccessJWT = async (email) => {
  const token = jsonwebtoken.sign({ email }, process.env.ACCESS_JWT, {
    expiresIn: "2m",
  });
  await addSessionToken({ token: token, associate: email });
  return token;
};

export const createRefreshJWT = async (email) => {
  const token = jsonwebtoken.sign({ email }, process.env.REFRESH_JWT, {
    expiresIn: "30d",
  });
  await updateByFilter({ email }, { refreshJWT: token });

  return token;
};

export const verifyAccessJWT = (token) => {
  return jsonwebtoken.verify(token, process.env.ACCESS_JWT);
};
