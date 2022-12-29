import {
  IProductsCreateRequest,
  IProductsUpdateRequest,
} from "../../../interfaces/products";

export const mockedProductCreateValid: IProductsCreateRequest = {
  model: "teste",
  description: "Description of more than 10 characters",
  km: 0,
  year: "1972",
  saleType: "auction",
  vehicleType: "car",
  price: 123,
  coverPhoto: "www.google.com",
  photos: ["1", "2", "3"],
};

export const mockedProductCreateInvalidDescription = {
  model: "teste2",
  description: "short",
  km: 0,
  year: "1972",
  saleType: "auction",
  vehicleType: "car",
  price: 123,
  coverPhoto: "www.google.com",
  photos: ["1", "2", "3"],
};

// export const mockedProductCreateInvalidKM = {
//   model: "teste2",
//   description: "short",
//   km: -1,
//   year: "1972",
//   saleType: "auction",
//   vehicleType: "car",
//   price: 123,
//   coverPhoto: "www.google.com",
//   photos: ["1", "2", "3"],
// };
