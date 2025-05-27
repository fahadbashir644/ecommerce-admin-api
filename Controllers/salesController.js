import { col, Op, fn, literal } from 'sequelize';
import {Sale, Product, Category} from '../Models/relations.js';

const filterSales = async (req, res) => {
    try {
        const {startDate, endDate, productId, category} = req.query;
        const salesWhere = {};
        const categoryWhere = {};
    
        if (startDate && endDate) {
            salesWhere.date = {
                [Op.between]: [new Date(startDate), new Date(endDate)]
            }
        } else if (startDate) {
            salesWhere.date = {
                [Op.gte]: new Date(startDate)
            }
        } else if (endDate) {
            salesWhere.date = {
                [Op.lte]: new Date(endDate)
            }
        }
    
        if (productId) {
            salesWhere.product_id = productId;
        }
    
        if (category) {
            categoryWhere.name = category;
        }
    
        const sales = await Sale.findAll({
            where: salesWhere,
            include: [{
                model: Product,
                attributes: ['name'],
                required: true,
                include: [{
                    model: Category,
                    attributes: ['name'],
                    where: categoryWhere
                }]
            }]
        })
    
        res.status(200).json(sales);
    } catch(error) {
        console.log(error);
        res.status(500).json({error:'Error fetching sales'});
    }
}

const getSummary = async (req, res) => {
    try {
        const {period, startDate} = req.query;
    
        let format;
        switch(period) {
            case 'weekly':
                format = '%Y-%u';
                break;
            case 'monthly':
                format = '%Y-%m';
                break;
            case 'annual':
                format = '%Y';
                break;
            default:
                format = '%Y-%d';
                break;
        }
    
        let salesWhere = {};
        if (startDate) {
            salesWhere.start = {
                [Op.gte]: new Date(startDate)
            }
        }
        const sales = await Sale.findAll({
            attributes:[
                [fn('DATE_FORMAT', col('date'), format), 'period'],
                [fn('SUM', col('total_price')), 'total_revenue']
            ],
            where: salesWhere,
            group: [literal('period')],
            order: [[literal('period'), 'ASC']],
            raw: true
        });

        res.status(200).json(sales);
    } catch(error) {
        console.log(error);
        res.status(500).json({error: "Error fetching summary"});
    }
}

const getCategoriesSummary = async (req, res) => {
    try {
        const {startDate, endDate, categories} = req.query;
    
        const categoryList = categories ? categories.split(',') : [];
    
        if (categoryList.length == 0) {
            res.status(500).json({error: "Please provide atleast one category"});
        }
    
        const salesWhere = {};
        if (startDate && endDate) {
            salesWhere.date = {
                [Op.between]: [new Date(start), new Date(endDate)]
            }
        } else if(startDate) {
            salesWhere.date = {
                [Op.gte]: new Date(startDate)
            }
        } else if(endDate) {
            salesWhere.date = {
                [Op.lte]: new Date(endDate)
            }
        }
    
        const sales = await Sale.findAll({
            attributes: [
                [fn('SUM', col('total_price')), 'total_revenue'],
                [col('Product.Category.name'), 'category']
            ],
            where: salesWhere,
            include: [{
                model: Product,
                attributes: [],
                required: true,
                include: [{
                    model: Category,
                    attributes: [],
                    where: {
                        name: {
                            [Op.in]: categoryList
                        }
                    },
                }]
            }],
            group: [literal('category')],
            raw: true
        });
    
        res.status(200).json(sales);
    } catch(error) {
        console.log(error);
        res.status(500).json({error: "Error fetching categories summary"});
    }
}

export {filterSales, getSummary, getCategoriesSummary};