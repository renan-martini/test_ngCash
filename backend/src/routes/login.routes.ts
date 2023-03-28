import { Router } from "express";
import loginUserController from "../controllers/users/loginUser.controller";
import { validateSchemaMiddleware } from "../middlewares/validateSchema.middleware";
import { userLoginSchema } from "../schemas/user.schema";

export const loginRoute = Router();

loginRoute.post(
  "/",
  validateSchemaMiddleware(userLoginSchema),
  loginUserController
);
