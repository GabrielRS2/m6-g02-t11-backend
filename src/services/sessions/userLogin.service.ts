import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/AppError";
import { IUserLogin } from "../../interfaces/sessions";
import { compareSync } from "bcryptjs";

export const userLoginService = async ({ email, password }: IUserLogin) => {
  if (!email) {
    throw new AppError(400, "email is a required field");
  }

  if (!password) {
    throw new AppError(400, "password is a required field");
  }

  const userRepository = AppDataSource.getRepository(User);

  const findUser = await userRepository.findOneBy({ email });
  if (!findUser) {
    throw new AppError(403, "Email or password invalid");
  }
  if (!findUser.isActive) {
    throw new AppError(401, "Account deleted, please contact customer service");
  }

  const passwordMatch = compareSync(password, findUser.password);
  if (!passwordMatch) {
    throw new AppError(403, "Invalid password or Email");
  }

  const token = jwt.sign(
    { id: findUser.id, email: findUser.email },
    String(process.env.SECRET_KEY),
    { expiresIn: "24h" }
  );

  return { token: token, id: findUser.id };
};
