import * as yup from "yup";
import { SchemaOf } from "yup";

import { IProductsUpdateRequest } from "../../interfaces/products";

export const productUpdateSchema: SchemaOf<IProductsUpdateRequest> = yup
  .object()
  .shape({
    model: yup.string().notRequired(),
    description: yup
      .string()
      .notRequired()
      .min(10, "<description> must have at least 10 characters")
      .max(500, "<description> must have up to 500 characters"),
    km: yup.number().notRequired().min(0, "Must be positive"),
    year: yup.string().notRequired(),
    saleType: yup
      .string()
      .notRequired()
      .oneOf(["sale", "auction"], "<saleType> has to be a sale or auction"),
    vehicleType: yup
      .string()
      .notRequired()
      .oneOf(
        ["car", "motorbike"],
        "<vehicleType> has to be a car or a mortorbike"
      ),
    price: yup.number().notRequired().min(0, "Price needs to make sense"),
    isActive: yup.boolean().notRequired(),
    coverPhoto: yup.string().notRequired(),
    photos: yup.array().notRequired(),
  });
