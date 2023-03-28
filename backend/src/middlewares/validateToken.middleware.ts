import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";

export const ensureAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token && process.env.SECRET_KEY) {
    jwt.verify(token, process.env.SECRET_KEY, async (error, decoded: any) => {
      if (error) {
        return res.status(401).json({ message: "Invalid token!" });
      }
      req.user = {
        id: decoded?.sub,
        username: decoded.username,
      };
      return next();
    });
  } else {
    return res.status(401).json({ message: "Missing authorization token!" });
  }
};
