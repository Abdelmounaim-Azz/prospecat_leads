import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
interface UserPayload {
  id: string;
  email: string;
  password: string;
  name: string;
  company: string;
  stripeCustomerId: string;
  emailCode?: string;
  validated?: boolean;
  avatar?: string;
  dateCreated?: Date;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
}
declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session?.jwt) {
    return next();
  }

  try {
    const payload = jwt.verify(
      req.session.jwt,
      process.env.JWT_KEY!
    ) as UserPayload;
    req.currentUser = payload;
  } catch (err) {}

  next();
};
