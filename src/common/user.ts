import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../model/user";
const JWT_SECRET = process.env.JWT_SECRET ?? "";
export const requireSignin = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization;

      const verifytoken: any = jwt.verify(token, JWT_SECRET);

      const rootuser = await User.findOne({
        _id: verifytoken._id,
        "tokens.token": token,
      });

      if (!rootuser) {
        throw "user not found";
      }

      req.user = rootuser;
      next();
    } else {
      throw "Authentication is required";
    }
  } catch (error) {
    return res.status(400).json({ message: "Authorization required" });
  }
};

export const checkAdmin = (req: any, res: Response, next: NextFunction) => {
  if (req.user?.role !== "admin") {
    return res.status(400).json({ message: "user is not admin" });
  }

  next();
};
