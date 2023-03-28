import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";
import * as jwt from "jsonwebtoken";
import { IUser } from "../../interfaces/users.interfaces";
import { compare } from "bcryptjs";
import "dotenv/config";

export const loginUserService = async (userData: IUser) => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({
    username: userData.username,
  });

  if (!user) {
    throw new AppError(404, "Invalid username or password");
  }

  const matchPassword = await compare(userData.password, user.password);

  if (!matchPassword) {
    throw new AppError(401, "Invalid email or password");
  }

  const token = jwt.sign(
    { username: user.username },
    process.env.SECRET_KEY as string,
    {
      subject: user.id,
      expiresIn: "24h",
    }
  );

  return token;
};
