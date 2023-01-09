import jwt from "jsonwebtoken";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/AppError";
import { status_code } from "../../utils/status_code";
import "dotenv/config";

import { createEmail, sendEmail } from "../email/email.service";

export const userForgotPasswordService = async (email: string) => {
  if (!email) {
    throw new AppError(
      status_code.HTTP_400_BAD_REQUEST,
      "email is a required field"
    );
  }

  const userRepo = AppDataSource.getRepository(User);

  const user = (await userRepo.find()).find((user) => user.email === email);

  if (!user) {
    throw new AppError(status_code.HTTP_403_FORBIDDEN, "Email invalid");
  }
  if (!user.isActive) {
    throw new AppError(
      status_code.HTTP_401_UNAUTHORIZED,
      "Account deleted, please contact customer service"
    );
  }
  const secret = process.env.SECRET_KEY + user.password;
  const token = jwt.sign({ email: user.email, id: user.id }, secret, {
    expiresIn: "10m",
  });
  const link = `${process.env.FRONT_URL}recoverPassword/${user.id}/${token}`;

  let ToSend = {
    body: {
      name: user.name,
      intro:
        "You have received this email because a password reset request for your account was received.",
      action: {
        instructions: "Click the button below to reset your password:",

        button: {
          color: "#DC4D2F",
          text: "Reset your password",
          link: link,
        },
      },
      outro: [
        "Or past the link in your nav",
        link,
        "If you did not request a password reset, no further action is required on your part.",
      ],
    },
  };
  const emailToSend = createEmail(ToSend);
  const emailSended = sendEmail(email, emailToSend, "Password Reset");

  return emailSended;
};
