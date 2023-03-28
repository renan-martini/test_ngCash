import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { IUserData } from "../../interfaces/users.interfaces";
import { loginUserService } from "../../services/users/loginUser.service";
import { readProfileService } from "../../services/users/readProfile.service";

const readProfileController = async (req: Request, res: Response) => {
  const userData: IUserData = req.user;
  const user = await readProfileService(userData);
  return res.status(200).json(instanceToPlain(user));
};

export default readProfileController;
