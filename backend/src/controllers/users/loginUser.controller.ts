import { Request, Response } from "express";
import { IUser } from "../../interfaces/users.interfaces";
import { loginUserService } from "../../services/users/loginUser.service";

const loginUserController = async (req: Request, res: Response) => {
  const userData: IUser = req.body;
  const token = await loginUserService(userData);
  return res.status(200).json({ token });
};

export default loginUserController;
