import sequelize from '../Config/db.js';
import { DataTypes } from 'sequelize';

const Sale = sequelize.define('Sale', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    product_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
    total_price: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    }
}, {
    tableName: 'sales',
    indexes: [
        { fields: ['product_id'] },
        { fields: ['date'] }
    ]
});

export default Sale;