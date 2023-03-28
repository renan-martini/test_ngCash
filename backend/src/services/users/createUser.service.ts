import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";
import { Account } from "../../entities/account.entity";
import { IUser } from "../../interfaces/users.interfaces";
import { hashSync } from "bcryptjs";

export const createUserService = async (userData: IUser) => {
  const userRepository = AppDataSource.getRepository(User);
  const accountRepository = AppDataSource.getRepository(Account);

  const userAlreadyExists = await userRepository.findOneBy({
    username: userData.username,
  });

  if (userAlreadyExists) {
    throw new AppError(400, "Username is already being used!");
  }

  const newAccount = accountRepository.create({});
  await accountRepository.save(newAccount);

  const newUser = userRepository.create({
    ...userData,
    password: hashSync(userData.password, 10),
    account: newAccount,
  });
  await userRepository.save(newUser);

  return newUser;
};
