import { Router } from "express";
import createTransactionController from "../controllers/transactions/createTransaction.controller";
import readTransactionController from "../controllers/transactions/readTransactions.controller";
import { validateSchemaMiddleware } from "../middlewares/validateSchema.middleware";
import { ensureAuth } from "../middlewares/validateToken.middleware";
import { transactionSchema } from "../schemas/transaction.schema";

export const transactionsRoutes = Router();

transactionsRoutes.post(
  "/",
  ensureAuth,
  validateSchemaMiddleware(transactionSchema),
  createTransactionController
);

transactionsRoutes.get("/", ensureAuth, readTransactionController);
