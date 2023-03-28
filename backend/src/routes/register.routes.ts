import { Router } from "express";
import createUserController from "../controllers/users/createUser.controller";
import { validateSchemaMiddleware } from "../middlewares/validateSchema.middleware";
import userSchema from "../schemas/user.schema";

export const registerRoute = Router();

registerRoute.post(
  "/",
  validateSchemaMiddleware(userSchema),
  createUserController
);
