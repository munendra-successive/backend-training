import Joi from "joi";

class JoiSchema {

  
  userConfig = (path: string) => {
    if (path === "/users/login") {
      return this.loginSchema;
    }
    if (path === "/users/register") {
      return this.registerSchema;
    }
    if (path === "/users/create") {
      return this.createUserSchema;
    }
  };

  // Login Schema
  loginSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
    password: Joi.string()
      .pattern(new RegExp("^(?=.*[@$])(?=.*[a-zA-Z0-9]).{3,30}$"))
      .required(),
  });

  // Register Schema
  registerSchema = Joi.object({
    firstname: Joi.string().alphanum().min(3).max(15).required(),
    lastname: Joi.string().alphanum().min(3).max(15),
    birth_year: Joi.number().integer().min(1900).max(2013),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "in", "net"] },
    }),
    gender: Joi.string().min(3).max(10).required(),
    password: Joi.string()
      .pattern(new RegExp("^(?=.*[@$])(?=.*[a-zA-Z0-9]).{3,30}$"))
      .required(),
  });

  createUserSchema = Joi.object({
    name: Joi.string().alphanum().min(3).max(15).required(),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "in", "net"] },
    }),
    password: Joi.string()
      .pattern(new RegExp("^(?=.*[@$])(?=.*[a-zA-Z0-9]).{3,30}$"))
      .required(),
  });
}
export default new JoiSchema();
