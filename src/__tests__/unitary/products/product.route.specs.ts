import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest";
import app from "../../../app";

import { AppError } from "../../../errors/AppError";
import { Product } from "../../../entities/products.entity";
import { Photo } from "../../../entities/photos.entity";

import { productsCreateService } from "../../../services/products/productsCreate.service";
import { productsUpdateService } from "../../../services/products/productsUpdate.service";
import { listAllProductsService } from "../../../services/products/productsList.service";
import { listProductService } from "../../../services/products/productList.service";
import { productsDeleteService } from "../../../services/products/productsDelete.service";
import {
  mockedProductCreateInvalidDescription,
  mockedProductCreateValid,
} from "../../mocks/productMocks";

describe("Testing product services", () => {
  let connection: DataSource;
  let photo: Photo;
  let product: Product;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });
  });

  test("Create service - Should be able to create a Product", async () => {
    product = await productsCreateService(mockedProductCreateValid);

    expect(product).toHaveProperty("id");
    expect(product).toHaveProperty("model", mockedProductCreateValid.model);
    expect(product).toHaveProperty(
      "description",
      mockedProductCreateValid.description
    );
    expect(product).toHaveProperty("year", mockedProductCreateValid.year);
    expect(product).toHaveProperty(
      "saleType",
      mockedProductCreateValid.saleType
    );
    expect(product).toHaveProperty("model", mockedProductCreateValid.model);
    expect(product).toHaveProperty(
      "vehicleType",
      mockedProductCreateValid.vehicleType
    );
    expect(product).toHaveProperty("price", mockedProductCreateValid.price);
    expect(product).toHaveProperty("isActive", true);
    expect(product.photos.length).toBe(4);
  });

  test("Retrieve all service - Should be able to list products", async () => {
    const productsList = await listAllProductsService();

    expect(productsList.length).toBe(1);
    expect(productsList[0]).toHaveProperty("id");
    expect(productsList[0]).toHaveProperty(
      "model",
      mockedProductCreateValid.model
    );
    expect(productsList[0]).toHaveProperty(
      "description",
      mockedProductCreateValid.description
    );
    expect(productsList[0]).toHaveProperty(
      "year",
      mockedProductCreateValid.year
    );
    expect(productsList[0]).toHaveProperty(
      "saleType",
      mockedProductCreateValid.saleType
    );
    expect(productsList[0]).toHaveProperty(
      "model",
      mockedProductCreateValid.model
    );
    expect(productsList[0]).toHaveProperty(
      "vehicleType",
      mockedProductCreateValid.vehicleType
    );
    expect(productsList[0]).toHaveProperty(
      "price",
      mockedProductCreateValid.price
    );
    expect(productsList[0]).toHaveProperty("isActive", true);
    expect(productsList[0].photos.length).toBe(1);
    expect(productsList[0].photos[0]).toHaveProperty("is_cover_img", true);
  });

  test("Retrieve one service - Should be able to list one product by id", async () => {
    const oneProduct = await listProductService(product.id);

    expect(oneProduct).toHaveProperty("id");
    expect(oneProduct).toHaveProperty("model", mockedProductCreateValid.model);
    expect(oneProduct).toHaveProperty(
      "description",
      mockedProductCreateValid.description
    );
    expect(oneProduct).toHaveProperty("year", mockedProductCreateValid.year);
    expect(oneProduct).toHaveProperty(
      "saleType",
      mockedProductCreateValid.saleType
    );
    expect(oneProduct).toHaveProperty("model", mockedProductCreateValid.model);
    expect(oneProduct).toHaveProperty(
      "vehicleType",
      mockedProductCreateValid.vehicleType
    );
    expect(oneProduct).toHaveProperty("price", mockedProductCreateValid.price);
    expect(oneProduct).toHaveProperty("isActive", true);
    expect(oneProduct.photos.length).toBe(4);
  });

  test("Delete Service - Shouldn't be able to delete unexistent product", async () => {
    expect(async () => {
      await productsDeleteService("255165156");
    }).rejects.toThrow("Product not found");
  });

  afterAll(async () => {
    await connection.destroy();
  });
});
