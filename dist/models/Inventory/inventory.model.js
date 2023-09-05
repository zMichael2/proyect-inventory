"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_database_1 = require("../../database/config.database");
const inventory_interface_1 = require("../../interface/inventory/inventory.interface");
const user_model_1 = __importDefault(require("../AuthUser/user.model"));
inventory_interface_1.Inventory.init({
    id: {
        type: sequelize_1.DataTypes.STRING(50),
        primaryKey: true,
        allowNull: false,
    },
    user_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true,
    },
    total_price: {
        type: sequelize_1.DataTypes.DECIMAL,
        allowNull: false,
    },
    price_paid: {
        type: sequelize_1.DataTypes.DECIMAL,
        allowNull: true,
        defaultValue: null,
    },
    neighborhood: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: true,
    },
    date: {
        type: sequelize_1.DataTypes.STRING(30),
        allowNull: true,
    },
    payment_end_day: {
        type: sequelize_1.DataTypes.STRING(10),
        allowNull: false,
    },
    pending_debt: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    iscompleted: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    isactive: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true,
    },
    created_at: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
}, {
    sequelize: config_database_1.sequelize,
    modelName: "Inventory",
    tableName: "inventory",
    timestamps: false,
});
inventory_interface_1.Inventory.belongsTo(user_model_1.default, { foreignKey: "user_id" });
exports.default = inventory_interface_1.Inventory;
