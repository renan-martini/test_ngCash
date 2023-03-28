import * as express from "express";
import { IUserRequest } from "../../src/interfaces/users";

declare global {
  namespace Express {
    interface Request {
      user: {
        username: string;
        id: string;
      };
    }
  }
}
