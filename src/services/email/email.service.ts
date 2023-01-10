import { status_code } from "../../utils/status_code";
import "dotenv/config";
import * as nodemailer from "nodemailer";
import Mailgen from "mailgen";
import { AppError } from "../../errors/AppError";

export const createEmail = (email: Mailgen.Content) => {
  const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "So veiculos T11 ",
      link: `${process.env.FRONT_URL}`,
      // logo: 'https://mailgen.js/img/logo.png'
    },
  });

  const html = mailGenerator.generate(email);

  const text = mailGenerator.generatePlaintext(email);

  return { html, text };
};
export const sendEmail = (email: string, emailToSend: any, subject: string) => {
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
    subject: subject,
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
