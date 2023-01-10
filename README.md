# m6-g02-t11-backend Documentation

## Content Table

- [m6-g02-t11-backend Documentation](#m6-g02-t11-backend-documentation)
	- [Content Table](#content-table)
	- [1. Overview](#1-overview)
	- [2. Getting Started](#2-getting-started)
		- [2.1. Installing Dependencies](#21-installing-dependencies)
		- [2.2. Environment Variables](#22-environment-variables)
		- [2.3. Migrations](#23-migrations)
	- [3. Authentication](#3-authentication)
	- [4 **Products**](#4-products)
		- [4.1 **Endpoints**](#41-endpoints)
- [](#)
			- [4.11 POST /products](#411-post-products)
				- [Request:](#request)
				- [Expected Response:](#expected-response)
				- [Error Responses:](#error-responses)
- [](#-1)
			- [4.12 GET /products](#412-get-products)
				- [Request:](#request-1)
				- [Expected Response:](#expected-response-1)
				- [Error Responses:](#error-responses-1)
- [](#-2)
			- [4.13 GET /products/:id](#413-get-productsid)
				- [Request:](#request-2)
				- [Expected Response:](#expected-response-2)
				- [Error Responses:](#error-responses-2)
- [](#-3)
			- [4.14 PATCH /products/:id](#414-patch-productsid)
				- [Request:](#request-3)
				- [Expected Response:](#expected-response-3)
			- [Error Responses:](#error-responses-3)
- [](#-4)
	- [4.15 DELETE /products/:id](#415-delete-productsid)
			- [Request:](#request-4)
			- [Error Responses:](#error-responses-4)

## 1. Overview

This API was designed to be the back-end of a sales app, focused on selling users vehicles( think e-bay, but focused on cars and motorbikes).

Our database was strutuctured on the following ERD:

- **insert final ERD here**

## 2. Getting Started

### 2.1. Installing Dependencies

Clone the project on your machine and install dependencies with the command:

```shell
yarn
```

### 2.2. Environment Variables

Then create a **.env** file, copying the **.env.example** file format:

```shell
cp .env.example .env
```

Set your environment variables with your Postgres credentials and a new database of your choice.

### 2.3. Migrations

Run migrations with the command:

```shell
yarn typeorm migration:run -d src/data-source.ts
```

## 3. Authentication

## 4 **Products**

The data structure of a product on our DB:

| **Field**    | **Type** | **Description**                                       |
| ------------ | -------- | ----------------------------------------------------- |
| id           | string   | Product's unique identifier                           |
| model        | string   | Product's name/mode                                   |
| description  | string   | A description of the product                          |
| KM           | number   | The number of kilometers the vehicles has (in meters) |
| year         | string   | The year the vehicle was manufactured                 |
| vehicle_type | string   | Product's type (motorcycle or car)                    |
| price        | number   | Product's price (in cents or equivalent)              |
| is_active    | boolean  | If a product should be listed                         |

</br>

### 4.1 **Endpoints**

| **Method** | **Route**                         | **Description**                               |
| ---------- | --------------------------------- | --------------------------------------------- |
| POST       | /products                         | Creates a product                             |
| GET        | /products                         | Lists all products                            |
| GET        | /products/:id(product)            | Lists a product using its ID as a parameter   |
| PATCH      | /products/:id(product)            | Updates a product using its ID as a parameter |
| DELETE     | /products/:id(product)            | Deletes a product using its ID as a parameter |
| POST       | /login//reset-password/           | Reset a password using email as a parameter   |
| POST       | /login//reset-password/:id/:token | Verify if token is valid and update password  |

<br>

#

#### 4.11 POST /products

[ Back to the top ](#content-table)

<br>

##### Request:

- Host: https://localhost:8000/
- Authorization: None
- Content-type: application/json

<br>

**Request body example**

```json
model: "Audi A3",
description: "A3 Sportback, black, excellent condition",
km: 100 000,
year: "2018",
saleType: sale,
vehicleType: "car",
price: 100 000 000,
coverPhoto: https://www.someimg.com/1231231",
photos: ["https://www.anotherimg.com", "https://www.anotherimg2.com", "https://www.anotherimg3.com"]
```

<br>

##### Expected Response:

<br>

**Status 201 - Created**

```json

{
	"message": "Product created",
	"product": {
		"id": "c1016112-341a-47c0-be80-4374e02561c6",
		"model": "Audi A3",
		"description": "A3 Sportback, black, excellent condition",
		"km": 100 000,
		"year": 2018,
		"saleType": "sale",
		"vehicleType": "car",
		"price": 100 000 000,
		"photos": [
			{
				"id": "9d4e989b-e210-42b6-8313-c6bcdbcbe98e",
				"content": "https://www.someimg.com/1231231",
				"is_cover_img": true
			},
			{
				"id": "93347c02-5433-4860-ad93-6c39e2a37a9d",
				"content": "https://www.anotherimg.com"
			},
			{
				"id": "0a70d19a-9b06-4fac-ad10-7f94214e1743",
				"content": "https://www.anotherimg2.com"
			},
			{
				"id": "c7bd1183-fd9f-4cea-83dd-fded9cf60f3a",
				"content": "https://www.anotherimg3.com"
			}
		],
		"isActive": true
	}
}
```

<br>

##### Error Responses:

<br>

**Status 400 - Missing required field**

```json
{
  "status": "Error",
  "code": 400,
  "message": "(any object key) is a required field"
}
```

<br>

**Status 400 - Invalid data type or length**

```json
{
  "status": "Error",
  "code": 400,
  "message": "yup error message"
}
```

**Status 409 - Duplicate listing**

```json
{
  "status": "Error",
  "code": 409,
  "message": "This listing already exists"
}
```

<br>

#

#### 4.12 GET /products

[ Back to the top ](#content-table)

<br>

##### Request:

- Host: https://localhost:8000/
- Authorization: none
- Content-type: application/json
- Body: none

<br>

##### Expected Response:

<br>

**Status 200 - OK**

```json
{
  "message": "Products retrieved successfully",
  "products": [
    {
		"id": "c1016112-341a-47c0-be80-4374e02561c6",
		"model": "Audi A3",
		"description": "A3 Sportback, black, excellent condition",
		"km": 100 000,
		"year": 2018,
		"saleType": "sale",
		"vehicleType": "car",
		"price": 100 000 000,
		"photos": [
			{
				"id": "9d4e989b-e210-42b6-8313-c6bcdbcbe98e",
				"content": "https://www.someimg.com/1231231",
				"is_cover_img": true
			},
			{
				"id": "93347c02-5433-4860-ad93-6c39e2a37a9d",
				"content": "https://www.anotherimg.com"
			},
			{
				"id": "0a70d19a-9b06-4fac-ad10-7f94214e1743",
				"content": "https://www.anotherimg2.com"
			},
			{
				"id": "c7bd1183-fd9f-4cea-83dd-fded9cf60f3a",
				"content": "https://www.anotherimg3.com"
			}
		],
		"isActive": true
	}
    ...
  ]
}
```

<br>

##### Error Responses:

<br>

**None expected**

#

#### 4.13 GET /products/:id

[ Back to the top ](#content-table)

<br>

##### Request:

- Host: https://localhost:8000/
- Authorization: None
- Content-type: application/json
- body: none

<br>

##### Expected Response:

<br>

**Status 200 - OK**

```json
{
  "message": "Product retrieved successfully",
  "product":
    {
		"id": "c1016112-341a-47c0-be80-4374e02561c6",
		"model": "Audi A3",
		"description": "A3 Sportback, black, excellent condition",
		"km": 100 000,
		"year": 2018,
		"saleType": "sale",
		"vehicleType": "car",
		"price": 100 000 000,
		"photos": [
			{
				"id": "9d4e989b-e210-42b6-8313-c6bcdbcbe98e",
				"content": "https://www.someimg.com/1231231",
				"is_cover_img": true
			},
			{
				"id": "93347c02-5433-4860-ad93-6c39e2a37a9d",
				"content": "https://www.anotherimg.com"
			},
			{
				"id": "0a70d19a-9b06-4fac-ad10-7f94214e1743",
				"content": "https://www.anotherimg2.com"
			},
			{
				"id": "c7bd1183-fd9f-4cea-83dd-fded9cf60f3a",
				"content": "https://www.anotherimg3.com"
			}
		],
		"isActive": true
	}
}
```

<br>

##### Error Responses:

<br>

**Status 404 - Accommodation not found**

```json
{
  "status": "Error",
  "code": 404,
  "message": "Product not found"
}
```

<br>

#

#### 4.14 PATCH /products/:id

[ Back to the top ](#content-table)

<br>

##### Request:

- Host: https://localhost:8000/
- Authorization: none
- Content-type: application/json

<br>

**Request body example**

```json
{
	"model?": "Audi A3",
	"description?": "A3 Sportback, black, excellent condition",
	"km?": 100 000,
	"year?": "2018",
	"saleType?": "sale",
	"vehicleType?": "car",
	"price?": 100 000 000,
	"coverPhoto?": "https://www.someimg.com/1231231",
	"photos?": ["https://www.anotherimg.com", "https://www.anotherimg2.com", "https://www.anotherimg3.com"],
	}
```

<br>

##### Expected Response:

<br>

**Status 201 - Created**

```json

{
	"message": "Product updated sucessfully",
	"product": {
		"id": "c1016112-341a-47c0-be80-4374e02561c6",
		"model": "Audi A3",
		"description": "A3 Sportback, black, excellent condition",
		"km": 100 000,
		"year": 2018,
		"saleType": "sale",
		"vehicleType": "car",
		"price": 100 000 000,
		"photos": [
			{
				"id": "9d4e989b-e210-42b6-8313-c6bcdbcbe98e",
				"content": "https://www.someimg.com/1231231",
				"is_cover_img": true
			},
			{
				"id": "93347c02-5433-4860-ad93-6c39e2a37a9d",
				"content": "https://www.anotherimg.com"
			},
			{
				"id": "0a70d19a-9b06-4fac-ad10-7f94214e1743",
				"content": "https://www.anotherimg2.com"
			},
			{
				"id": "c7bd1183-fd9f-4cea-83dd-fded9cf60f3a",
				"content": "https://www.anotherimg3.com"
			}
		],
		"isActive": true
	}
}
```

<br>

#### Error Responses:

<br>

**Status 400 - Invalid data type or length**

```json
{
  "status": "Error",
  "code": 400,
  "message": "yup error message"
}
```

<br>

**Status 404 - Product not found**

```json
{
  "status": "Error",
  "code": 404,
  "message": "Product not found"
}
```

<br>

#

## 4.15 DELETE /products/:id

<br>

#### Request:

- Host: https:/localhost:8000/
- Authorization: none
- Content-type: application/json
- Body: none

<br>

<br>

**Status 200 - OK**

```json
{
  "message": "Product deleted successfully"
}
```

<br>

#### Error Responses:

<br>

**Status 404 - Product not found**

```json
{
  "status": "Error",
  "code": 404,
  "message": "Product not found"
}
```
