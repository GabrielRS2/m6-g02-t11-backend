import { Response, Request } from "express";
import { userForgotPasswordService } from "../../services/sessions/recoverPassword.service";

export const recoverPasswordController = async (
  req: Request,
  res: Response
) => {
  const { email } = req.body;
  const token = await userForgotPasswordService(email);

  return res.status(200).json({ message: "Email sended successfully", token });
};
