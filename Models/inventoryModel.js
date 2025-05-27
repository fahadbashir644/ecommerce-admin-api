import sequelize from '../Config/db.js';
import { DataTypes } from 'sequelize';

const Inventory = sequelize.define('Inventory', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    product_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
    current_qty: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    updated_qty: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    }
}, {
    tableName: 'inventory',
    indexes: [
        { fields: ['product_id'] }
    ]
});

export default Inventory;