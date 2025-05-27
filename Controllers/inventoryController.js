import {Op} from 'sequelize';
import Product from '../Models/productModel.js';
import Inventory from '../Models/inventoryModel.js';

const getInventoryStatus = async (req, res) => {
    try {
        const threshold = parseInt(req.query.threshold);
        const productWhere = {};
    
        if (threshold) {
            productWhere.quantity = {
                [Op.lte]: threshold
            };
        }
    
        const inventory = await Product.findAll({
            where: productWhere
        });
    
        res.status(200).json(inventory);
    } catch(error) {
        console.log(error);
        res.status(500).json({error: 'Error fetching inventory'});
    }
}

const updateInventory = async (req, res) => {
    try {
        const {productId, quantity} = req.body;

        const product = await Product.findByPk(productId);
        if (!product) {
            res.status(404).json({error: "Product not found"});
        }

        product.quantity = parseInt(quantity);
        await product.save();

        await Inventory.create({
            product_id: productId,
            current_qty: product.quantity,
            updated_qty: quantity,
            date: new Date()
        });

        res.status(200).json('Inventory updated successfully');
    } catch(error) {
        console.log(error);
        res.status(500).json({error:'Error updating inventory'});
    }
}

export {getInventoryStatus, updateInventory};