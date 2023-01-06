import * as yup from "yup";
import { SchemaOf } from "yup";

import { IProductsCreateRequest } from "../../interfaces/products";

export const productCreateSchema: SchemaOf<IProductsCreateRequest> = yup
  .object()
  .shape({
    model: yup
      .string()
      .required()
      .min(5, "<model> should have at least 5 characters"),
    description: yup
      .string()
      .required()
      .min(10, "<description> must have at least 10 characters")
      .max(500, "<description> must have up to 500 characters"),
    km: yup.number().required().min(0, "Must be positive"),
    year: yup.string().required(),
    saleType: yup
      .string()
      .required()
      .oneOf(["sale", "auction"], "<saleType> has to be a sale or auction"),
    vehicleType: yup
      .string()
      .required()
      .oneOf(
        ["car", "motorbike"],
        "<vehicleType> has to be a car or a mortorbike"
      ),
    price: yup.number().required().min(0, "Price needs to make sense"),
    isActive: yup.boolean().notRequired(),
    coverPhoto: yup.string().required(),
    photos: yup.array().notRequired(),
    userId: yup.string().notRequired(),
  });
