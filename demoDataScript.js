import { v4 as uuidv4 } from 'uuid';
import { sequelize, Product, Sale, Inventory, Category } from './Models/relations.js';

const demoDataScript = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log('Database synced.');

    const categories = await Category.bulkCreate([
      { id: uuidv4(), name: 'Electronics' },
      { id: uuidv4(), name: 'Books' },
      { id: uuidv4(), name: 'Clothing' },
    ]);
    console.log('Categories created.');

    const categoryMap = {};
    categories.forEach(cat => categoryMap[cat.name] = cat.id);

    const products = await Product.bulkCreate([
      {
        id: uuidv4(),
        name: 'Wireless Mouse',
        category_id: categoryMap['Electronics'],
        price: 29.99,
        quantity: 100,
      },
      {
        id: uuidv4(),
        name: 'Bluetooth Keyboard',
        category_id: categoryMap['Electronics'],
        price: 49.99,
        quantity: 80,
      },
      {
        id: uuidv4(),
        name: 'JavaScript Book',
        category_id: categoryMap['Books'],
        price: 19.99,
        quantity: 50,
      },
      {
        id: uuidv4(),
        name: 'T-Shirt',
        category_id: categoryMap['Clothing'],
        price: 14.99,
        quantity: 200,
      },
    ]);
    console.log('Products created.');

    const productMap = {};
    products.forEach(prod => productMap[prod.name] = prod);

    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    await Sale.bulkCreate([
      {
        id: uuidv4(),
        product_id: productMap['Wireless Mouse'].id,
        total_price: 29.99,
        quantity: 2,
        date: today,
      },
      {
        id: uuidv4(),
        product_id: productMap['Wireless Mouse'].id,
        total_price: 29.99,
        quantity: 2,
        date: yesterday,
      },
      {
        id: uuidv4(),
        product_id: productMap['JavaScript Book'].id,
        total_price: 19.99,
        quantity: 1,
        date: yesterday,
      },
      {
        id: uuidv4(),
        product_id: productMap['T-Shirt'].id,
        total_price: 14.99,
        quantity: 5,
        date: today,
      },
    ]);
    console.log('Sales created.');

    await Inventory.bulkCreate([
      {
        id: uuidv4(),
        product_id: productMap['Wireless Mouse'].id,
        current_qty: 100,
        updated_qty: 98,
        date: today,
      },
      {
        id: uuidv4(),
        product_id: productMap['JavaScript Book'].id,
        current_qty: 50,
        updated_qty: 49,
        date: yesterday,
      },
      {
        id: uuidv4(),
        product_id: productMap['T-Shirt'].id,
        current_qty: 200,
        updated_qty: 195,
        date: today,
      },
    ]);
    console.log('Inventory records created.');

    console.log('Demo data created successfully!');
  } catch (error) {
    console.error('Error creating data:', error);
  }
};

demoDataScript();
