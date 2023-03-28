import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";
import * as jwt from "jsonwebtoken";
import { IUserData } from "../../interfaces/users.interfaces";
import { compare } from "bcryptjs";
import "dotenv/config";
import { Like, Raw } from "typeorm";
import { Transaction } from "../../entities/transaction.entity";
import { IQuery } from "../../interfaces/transactions.interface";

export const readTransactionService = async (
  userData: IUserData,
  reqQuery: IQuery
) => {
  const transactionRepository = AppDataSource.getRepository(Transaction);
  if (reqQuery.date) {
    try {
      const day = new Date(reqQuery.date!).toISOString() as any;
    } catch {
      throw new AppError(400, "Invalid date format (yyyy-mm-dd)");
    }
  }
  if (reqQuery.date) {
    const day = new Date(reqQuery.date!).toISOString() as any;
    let nextDay: any = reqQuery.date!.split("-");
    nextDay[2] = parseInt(nextDay[2]) + 1;
    nextDay = nextDay.join("-");

    const transactions = await transactionRepository.find({
      where:
        reqQuery.type == "in"
          ? [
              {
                creditedAccount: {
                  username: userData.username,
                },
                createdAt: Raw(
                  (data) => `${data} > :date AND ${data} < :dateEnd`,
                  {
                    date: day,
                    dateEnd: nextDay,
                  }
                ),
              },
            ]
          : reqQuery.type == "out"
          ? [
              {
                debitedAccount: {
                  username: userData.username,
                },
                createdAt: Raw(
                  (data) => `${data} > :date AND ${data} < :dateEnd`,
                  {
                    date: day,
                    dateEnd: nextDay,
                  }
                ),
              },
            ]
          : [
              {
                creditedAccount: {
                  username: userData.username,
                },
                createdAt: Raw(
                  (data) => `${data} > :date AND ${data} < :dateEnd`,
                  {
                    date: day,
                    dateEnd: nextDay,
                  }
                ),
              },
              {
                debitedAccount: {
                  username: userData.username,
                },
                createdAt: Raw(
                  (data) => `${data} > :date AND ${data} < :dateEnd`,
                  {
                    date: day,
                    dateEnd: nextDay,
                  }
                ),
              },
            ],
      relations: {
        debitedAccount: true,
        creditedAccount: true,
      },
      select: {
        id: true,
        value: true,
        creditedAccount: {
          username: true,
          id: true,
        },
        debitedAccount: {
          username: true,
          id: true,
        },
        createdAt: true,
      },
    });

    return transactions;
  } else {
    const transactions = await transactionRepository.find({
      where:
        reqQuery.type == "in"
          ? [
              {
                creditedAccount: {
                  username: userData.username,
                },
              },
            ]
          : reqQuery.type == "out"
          ? [
              {
                debitedAccount: {
                  username: userData.username,
                },
              },
            ]
          : [
              {
                creditedAccount: {
                  username: userData.username,
                },
              },
              {
                debitedAccount: {
                  username: userData.username,
                },
              },
            ],
      relations: {
        debitedAccount: true,
        creditedAccount: true,
      },
      select: {
        id: true,
        value: true,
        creditedAccount: {
          username: true,
          id: true,
        },
        debitedAccount: {
          username: true,
          id: true,
        },
        createdAt: true,
      },
    });

    return transactions;
  }
};
