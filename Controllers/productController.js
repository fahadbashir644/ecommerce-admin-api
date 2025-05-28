import Product from '../Models/productModel.js';
import Category from '../Models/categoryModel.js';

const registerProduct = async (req, res) => {
    try {
        const {name, category, price, quantity} = req.body;

        if (!name || !category || !price || !quantity) {
            return res.status(400).json({ error: "name, category, price and quantity are required" });
        }

        const product = await Product.findOne({
            where: { name }
        });
        if (product) {
            return res.status(404).json({error: "Product with same name already exists"});
        }
        
        const categoryModel = await Category.findOne({
            where: {
                name: category
            }
        });
        if (!categoryModel) {
            return res.status(404).json({error: "Invalid category provided"});
        }

        await Product.create({
            category_id: categoryModel.id,
            quantity: quantity,
            name: name,
            price: parseInt(price)
        });

        res.status(200).json('Product registered successfully');
    } catch(error) {
        console.log(error);
        res.status(500).json({error:'Error registering product'});
    }
}

export default registerProduct;