import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { ITransaction } from "../../interfaces/transactions.interface";
import { IUserData } from "../../interfaces/users.interfaces";
import { createTransactionService } from "../../services/transactions/createTransaction.service";

const createTransactionController = async (req: Request, res: Response) => {
  const userData: IUserData = req.user;
  const transactionData: ITransaction = req.body;
  const transaction = await createTransactionService(userData, transactionData);
  return res.status(201).json(instanceToPlain(transaction));
};

export default createTransactionController;
