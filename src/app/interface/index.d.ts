/* eslint-disable no-unused-vars */
import { JwtPayload } from "jsonwebtoken";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Request } from "express";
declare global {
  namespace Express {
    interface Request {
      user: JwtPayload;
    }
  }
}
