import sequelize from "../Config/db.js";
import Product from './productModel.js';
import Sale from './saleModel.js';
import Inventory from './inventoryModel.js';
import Category from './categoryModel.js';

Product.hasMany(Sale, {foreignKey: 'product_id'});
Sale.belongsTo(Product, {foreignKey: 'product_id'});

Product.hasMany(Inventory, {foreignKey: 'product_id'});
Inventory.belongsTo(Product, {foreignKey: 'product_id'});

Category.hasMany(Product, {foreignKey: 'category_id'});
Product.belongsTo(Category, {foreignKey: 'category_id'});

export {sequelize, Product, Sale, Inventory, Category};