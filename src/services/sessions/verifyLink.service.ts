import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/AppError";
import jwt from "jsonwebtoken";
import { status_code } from "../../utils/status_code";
import bcrypt from "bcryptjs";
import * as nodemailer from "nodemailer";
import Mailgen from "mailgen";

export const verifyLinkService = async (
  id: string,
  token: string,
  passord: string
) => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({ id });

  if (!user) {
    throw new AppError(
      status_code.HTTP_403_FORBIDDEN,
      "Email or password invalid"
    );
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

  const passwordHashed = await bcrypt.hash(passord, 10);
  userRepository.update(id, { password: passwordHashed });
  const email = createEmail(user, passwordHashed);
  const emailSended = sendEmail(user.email, email);
  return emailSended;
};

const createEmail = (user: any, password: string) => {
  var mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "So veiculos T11 ",
      link: `http://localhost:${process.env.PORT}/`,
    },
  });
  var email = {
    body: {
      name: user.name,
      intro:
        "You have received this email because a password reset request for your account was received.",
      text: `Your new passord is ${password}`,
      outro: "Don't share this password with anyone",
    },
  };

  // Generate an HTML email with the provided contents
  var html = mailGenerator.generate(email);

  // Generate the plaintext version of the e-mail (for clients that do not support HTML)
  var text = mailGenerator.generatePlaintext(email);

  return { html, text };
};
const sendEmail = (email: string, emailToSend: any) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAIL_USER,
      pass: process.env.NODEMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.NODEMAIL_USER,
    to: email,
    subject: "Password Reset",
    html: emailToSend.html,
    text: emailToSend.text,
  };

  transporter.sendMail(mailOptions, function (error: any, info: any) {
    if (error) {
      throw new AppError(status_code.HTTP_401_UNAUTHORIZED, error);
    } else {
      return "Email sent: " + info.response;
    }
  });
};
