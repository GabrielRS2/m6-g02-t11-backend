import jwt from "jsonwebtoken";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/AppError";
import { status_code } from "../../utils/status_code";
import "dotenv/config";
import * as nodemailer from "nodemailer";
import Mailgen from "mailgen";

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
  const link = `${process.env.FRONT_URL}reset-password/${user.id}/${token}`;

  const emailToSend = createEmail(user, link);
  const emailSended = sendEmail(email, emailToSend);

  return emailSended;
};

const createEmail = (user: any, link: string) => {
  var mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "So veiculos T11 ",
      link: `http://localhost:${process.env.PORT}/`,
      // logo: 'https://mailgen.js/img/logo.png'
    },
  });
  var email = {
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
