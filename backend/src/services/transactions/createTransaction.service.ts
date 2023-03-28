import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";
import { Account } from "../../entities/account.entity";
import { IUser, IUserData } from "../../interfaces/users.interfaces";
import { hashSync } from "bcryptjs";
import { ITransaction } from "../../interfaces/transactions.interface";
import { Transaction } from "../../entities/transaction.entity";

export const createTransactionService = async (
  userData: IUserData,
  transactionData: ITransaction
) => {
  const userRepository = AppDataSource.getRepository(User);
  const transactionRepository = AppDataSource.getRepository(Transaction);
  const accountRepository = AppDataSource.getRepository(Account);

  const [creditedUser] = await userRepository.find({
    where: {
      username: transactionData.username,
    },
    relations: {
      account: true,
    },
  });

  const [debitedUser] = await userRepository.find({
    where: {
      username: userData.username,
    },
    relations: {
      account: true,
    },
  });

  if (!creditedUser) {
    throw new AppError(404, "User do not exist");
  }

  if (creditedUser.username == debitedUser!.username) {
    throw new AppError(400, "You cannot transfer money for your own self");
  }

  if (debitedUser!.account.balance < transactionData.value) {
    throw new AppError(400, "Insufficient balance");
  }
  await accountRepository.update(creditedUser.account.id, {
    balance: creditedUser!.account.balance + transactionData.value,
  });

  await accountRepository.update(debitedUser!.account.id, {
    balance: debitedUser!.account.balance - transactionData.value,
  });

  const creditedUserUpdated = await userRepository.findOneBy({
    username: creditedUser.username,
  });

  const debitedUserUpdated = await userRepository.findOneBy({
    username: userData.username,
  });

  const { creditedAccount, ...transaction } = transactionRepository.create({
    creditedAccount: creditedUserUpdated!,
    debitedAccount: debitedUserUpdated!,
    value: transactionData.value,
  });
  await transactionRepository.save({ creditedAccount, ...transaction });

  return { ...transaction, creditedAccountId: creditedAccount.id };
};
