# E-commerce Admin API

This is a backend application for managing products, inventory, and sales in an e-commerce admin dashboard. It is built using **Node.js**, **Express**, **Sequelize ORM**, and **MySQL**.

---

## Features

- Product Management
- Inventory Updates and History
- Sales Tracking and Analytics (weekly, monthly, annual summaries)

---

## Tech Stack

- Node.js
- Express
- Sequelize (ORM)
- MySQL
- RESTful APIs
---

## Installation

### 1. Clone the repository


git clone https://github.com/fahadbashir644/ecommerce-admin-api.git
cd ecommerce-admin-api

1-Install dependencies using
    npm install

2-Create a database named 'ecommerce_admin', user should be root and password should be '1234'
    CREATE DATABASE ecommerce_admin;

3-Create demo data by running script demoDataScript
    node demoDataScript.js

4-Start server
    node app.js



## Endpoints

1. GET /sales
Description:
Fetch sales records filtered by date range, product ID, and/or category name.

Query Parameters:

- startDate (optional): filter sales starting from this date

- endDate (optional): filter sales up to this date

- productId (optional): filter by specific product ID

- category (optional): filter by product's category name

Example:
/sales?startDate=2024-01-01&endDate=2024-01-31&category=Electronics

Response:
A list of sales with associated product and category details.

---------------------------------------------------------------------

2. GET /sales/summary
Description:
Returns total revenue grouped by a time period.

Query Parameters:

- period (required): one of daily, weekly, monthly, or annual

- startDate (optional): filter sales from this date onward

Example:
/sales/summary?period=monthly&startDate=2024-01-01

Response:
A list of revenue totals for each period, e.g. month or year.

---------------------------------------------------------------

3. GET /sales/categories-summary
Description:
Returns total revenue for the specified product categories.

Query Parameters:

- categories (required): comma-separated category names (e.g., Food,Electronics)

- startDate (optional): filter from this date

- endDate (optional): filter up to this date

Example:
/sales/categories-summary?categories=Furniture,Electronics&startDate=2024-01-01

Response:
A list of category names and their corresponding total revenues.

-------------------------------------------------------------

4. GET /inventory/status
Description:
Returns a list of products filtered by their current quantity. If a threshold is provided, it fetches only the products with quantity less than or equal to the threshold.

Query Parameters:

- threshold (optional): number value to filter products with quantity ≤ threshold

Example:
/inventory/status?threshold=10

Response:
A list of product objects whose quantity is less than or equal to 10.


------------------------------------------------------------------

5. PUT /inventory/update
Description:
Updates the inventory quantity of a product. Also logs the inventory change in the Inventory table.

Body Parameters (JSON):

- productId (required): ID of the product to update

- quantity (required): New quantity to set for the product


-----------------------------------------------------------------------

6. POST /products/register
Description:
Registers a new product by validating its name, category, price, and quantity. Checks for duplicate product names and valid category before creation.

Request Body (JSON):

- name (required): Name of the product (must be unique)

- category (required): Category name (must already exist in the system)

- price (required): Price of the product (numeric)

- quantity (required): Initial stock quantity (numeric)



### Database Schema

## TABLES & MODELS

1-Category

Table name: categories

Fields:

- id: UUID (Primary key)

- name: STRING (Unique, Not null)

--------------------------------------------------------

2-Product

Table name: products

Fields:

- id: UUID (Primary key)

- name: STRING (Unique, Not null)

- category_id: UUID (Foreign key to categories.id, Not null)

- price: DECIMAL(10,2) (Not null)

- quantity: INTEGER (Not null)

Indexes:

- category_id

-------------------------------------------------------------

3-Sale

Table name: sales

Fields:

- id: UUID (Primary key)

- product_id: UUID (Foreign key to products.id, Not null)

- total_price: DECIMAL(10,2) (Not null)

- quantity: INTEGER (Not null)

- date: DATEONLY (Not null)

Indexes:

- product_id

- date


----------------------------------------------------------


4-Inventory

Table name: inventory

Fields:

- id: UUID (Primary key)

- product_id: UUID (Foreign key to products.id, Not null)

- current_qty: INTEGER (Not null)

- updated_qty: INTEGER (Not null)

- date: DATEONLY (Not null)

Indexes:

- product_id


### RELATIONSHIPS

Category → Product: One-to-Many

Product → Sale: One-to-Many

Product → Inventory: One-to-Many