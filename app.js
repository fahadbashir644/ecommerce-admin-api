import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import saleRoutes from './Routes/saleRoutes.js';
import inventoryRoutes from './Routes/inventoryRoutes.js';
import productRoutes from './Routes/productRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/sales', saleRoutes);
app.use('/inventory', inventoryRoutes);
app.use('/product', productRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
})