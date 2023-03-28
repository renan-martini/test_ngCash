import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { IUserData } from "../../interfaces/users.interfaces";
import { readTransactionService } from "../../services/transactions/readTransactions.service";

const readTransactionController = async (req: Request, res: Response) => {
  const userData: IUserData = req.user;
  const reqQuery = req.query;
  const transactions = await readTransactionService(userData, reqQuery);
  return res.status(200).json(instanceToPlain(transactions));
};

export default readTransactionController;
