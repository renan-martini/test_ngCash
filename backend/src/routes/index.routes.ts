import { Express } from "express";
import { loginRoute } from "./login.routes";
import { profileRoute } from "./profile.routes";
import { registerRoute } from "./register.routes";
import { transactionsRoutes } from "./transactions.routes";

export const appRoutes = (app: Express) => {
  app.use("/register", registerRoute);
  app.use("/login", loginRoute);
  app.use("/profile", profileRoute);
  app.use("/transactions", transactionsRoutes);
};
