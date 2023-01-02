import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest";
import app from "../../../app";

import {
  mockedProductCreateValid,
  mockedProductCreateInvalidDescription,
} from "../../mocks/productMocks";
import { convertToObject } from "typescript";

describe("Testing products routes", () => {
  let connection: DataSource;
  let genericProduct: any;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((error) => {
        console.log(error);
      });
  });

  test("POST /products - should be able to create a product", async () => {
    const response = await request(app)
      .post("/products")
      .send(mockedProductCreateValid);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("message", "Product created");
    expect(response.body).toHaveProperty("product");
    genericProduct = response.body.product;
  });

  test("POST /products - shouldn't be able to create a product that already exists", async () => {
    const response = await request(app)
      .post("/products")
      .send(mockedProductCreateValid);

    expect(response.status).toBe(409);
    expect(response.body.message).toBe("This product is already listed");
  });

  test("POST /products - shouldn't be able to create a product with invalid data", async () => {
    const response = await request(app)
      .post("/products")
      .send(mockedProductCreateInvalidDescription);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      "<description> must have at least 10 characters"
    );
  });

  test("GET /products - should be able to retrieve all products", async () => {
    const response = await request(app).get("/products");

    expect(response.status).toBe(200);
    expect(response.body.products[0].id).toBe(genericProduct.id);
  });

  test("GET /products/:id - should be able to retrieve a product by id", async () => {
    const response = await request(app).get(`/products/${genericProduct.id}`);

    expect(response.status).toBe(200);
    expect(response.body.product.id).toBe(genericProduct.id);
  });

  test("GET /products/:id - shouldn't be able to retrieve a product that doesn't exist", async () => {
    const response = await request(app).get(`/products/12112`);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Product not found");
  });

  test("PATCH /products/:id - should be able to update a product", async () => {
    const response = await request(app)
      .patch(`/products/${genericProduct.id}`)
      .send({ model: "patched" });

    expect(response.status).toBe(200);
    expect(response.body.product.model).toBe("patched");
  });

  test("PATCH /products/:id - shouldn't be able to update a product that doesn't exist", async () => {
    const response = await request(app)
      .patch("/products/12345")
      .send({ model: "patched again" });

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Product not found");
  });

  test("DELETE - /products/:id - should be able to delete a product", async () => {
    const response = await request(app).delete(
      `/products/${genericProduct.id}`
    );

    expect(response.status).toBe(200);
  });

  test("DELETE - /products/:id - shouldn't be able to delete a product that doesn't exist", async () => {
    const response = await request(app).delete(
      `/products/${genericProduct.id}`
    );

    expect(response.status).toBe(404);
  });
});
