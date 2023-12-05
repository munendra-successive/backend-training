import { Schema } from "joi";
import { loginSchema, registerSchema } from "../schema.js";

// Dynamically returns schema based on route
const userConfig = (path:string):Schema | undefined => {
  if (path === "/users/login") {
    return loginSchema;
  }
  if (path === "/users/register") {
    return registerSchema;
  }
};

export { userConfig };