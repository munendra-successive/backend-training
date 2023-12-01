import { loginSchema, registerSchema } from "../schema.js";

// Dynamically returns schema based on route
const userConfig = (path:string) => {
  if (path === "/users/login") {
    return loginSchema;
  }
  if (path === "/users/register") {
    return registerSchema;
  }
};

export { userConfig };