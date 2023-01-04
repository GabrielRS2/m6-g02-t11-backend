import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/AppError";
import { IUserLogin } from "../../interfaces/sessions";

export const userLoginService = async ({ email, password }: IUserLogin) => {
  const userRepository = AppDataSource.getRepository(User);
  const findUser = await userRepository.findOneBy({ email: email });

  if (!findUser) {
    throw new AppError(403, "Email or password invalid");
  }

  if (!bcrypt.compareSync(password, findUser.password)) {
    throw new AppError(403, "Email or password invalid");
  }

  const token = jwt.sign(
    {
      email: findUser.email,
    },
    process.env.SECRET_KEY as string,
    {
      expiresIn: "24h",
      subject: findUser.id,
    }
  );

  return token;
};
