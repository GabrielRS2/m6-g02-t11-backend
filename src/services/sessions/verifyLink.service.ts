import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/AppError";
import jwt from "jsonwebtoken";
import { status_code } from "../../utils/status_code";
import bcrypt from "bcryptjs";
import { createEmail, sendEmail } from "../email/email.service";

export const verifyLinkService = async (
  id: string,
  token: string,
  password: string
) => {
  console.log(password);
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({ id });

  if (!user) {
    throw new AppError(status_code.HTTP_404_NOT_FOUND, "User not faund");
  }
  if (!user.isActive) {
    throw new AppError(
      status_code.HTTP_401_UNAUTHORIZED,
      "Account deleted, please contact customer service"
    );
  }
  const secret = process.env.SECRET_KEY + user.password;

  const verify = jwt.verify(token, secret, (err: any, decoded: any) => {
    if (err) {
      throw new AppError(status_code.HTTP_406_NOT_ACCEPTABLE, "Invalid token");
    }
  });

  const passwordHashed = await bcrypt.hash(password, 10);
  userRepository.update(id, { password: passwordHashed });
  var ToSend = {
    body: {
      name: user.name,
      intro:
        "You have received this email because a password reset request for your account was received.",
      text: `Your new passord is ${password}`,
      outro: "Don't share this password with anyone",
    },
  };
  const email = createEmail(ToSend);
  const emailSended = sendEmail(user.email, email, "Password Reseted");
  return emailSended;
};
