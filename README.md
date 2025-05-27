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

---

## Installation

### 1. Clone the repository

```bash
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
