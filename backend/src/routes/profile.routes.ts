import { Router } from "express";
import readProfileController from "../controllers/users/readProfile.controller";
import { ensureAuth } from "../middlewares/validateToken.middleware";

export const profileRoute = Router();

profileRoute.get("/", ensureAuth, readProfileController);
