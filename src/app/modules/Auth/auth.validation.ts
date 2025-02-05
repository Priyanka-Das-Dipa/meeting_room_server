import { z } from "zod";


export const loginValidationSchema = z.object({
    body: z.object({
      email: z.string({ required_error: "Email is required to login" }),
      password: z.string({ required_error: "Password is required to login" }),
    }),
  });
  
  export const authValidation = {
    loginValidationSchema,
  };