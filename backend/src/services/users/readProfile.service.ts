import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";
import * as jwt from "jsonwebtoken";
import { IUserData } from "../../interfaces/users.interfaces";
import { compare } from "bcryptjs";
import "dotenv/config";

export const readProfileService = async (userData: IUserData) => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.find({
    where: {
      username: userData.username,
    },
    relations: {
      account: true,
    },
    select: {
      id: true,
      username: true,
      account: {
        id: true,
        balance: true,
      },
    },
  });

  if (!user[0]) {
    throw new AppError(404, "User not found");
  }

  return user[0];
};
