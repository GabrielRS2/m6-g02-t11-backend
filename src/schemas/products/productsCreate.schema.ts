import { SchemaOf } from "yup";
import * as yup from "yup";

import { IProductsCreateRequest } from "../../interfaces/products";

export const productCreateSchema /*: SchemaOf<IProductsCreateRequest>*/ = yup
  .object()
  .shape({
    model: yup.string().required().min(5, "Model needs at least 5 characters"),
    description: yup
      .string()
      .required()
      .min(5, "Description needs at least 5 characters"),
    km: yup.number().required().min(0, "KM needs to make sense"),
    year: yup.number().required().min(1880, "Car year needs to make sense"),
    saleType: yup.string().required(),
    vehicleType: yup.string().required(),
    price: yup.number().required().min(1, "Price needs to make sense"),
    isActive: yup.boolean().notRequired(),
    coverPhoto: yup.string().required(),
    photos: yup.array().notRequired(),
  });
