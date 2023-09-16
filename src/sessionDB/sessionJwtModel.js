import sessionJwtSchema from "./sessionJwtSchema.js";

export const addSessionToken = (token) => {
  return sessionJwtSchema(token).save();
};
