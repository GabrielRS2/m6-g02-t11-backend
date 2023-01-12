import * as yup from "yup";
import { SchemaOf } from "yup";
import { IUserCreate } from "../../interfaces/users";

export const userCreateSchema: SchemaOf<IUserCreate> = yup.object().shape({
  name: yup
    .string()
    .required()
    .max(20, "name should have no more than 20 characters")
    .matches(/^[A-Za-z\s]*$/, "name field can have only letters and spaces"),
  email: yup
    .string()
    .required()
    .max(30, "email field should have up to 30 characters"),
  password: yup
    .string()
    .required()
    .min(4, "password field should have at least 4 characters")
    .max(50, "password field should have up to 50 characters"),
  dob: yup
    .string()
    .required()
    .matches(
      /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/,
      "Format should be yyyy-mm-dd"
    ),
  cpf: yup.string().required(),
  phone: yup.string().required(),
  description: yup.string().required(),
  isSeller: yup.bool().required(),
  cep: yup.string().required(),
  state: yup.string().required(),
  city: yup.string().required(),
  street: yup.string().required(),
  number: yup.string().required(),
  complement: yup.string().required(),
});
