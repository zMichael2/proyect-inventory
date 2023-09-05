"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_database_1 = require("../../database/config.database");
const cumulativeprice_interface_1 = require("../../interface/inventory/cumulativeprice.interface");
const inventory_model_1 = __importDefault(require("./inventory.model"));
const user_model_1 = __importDefault(require("../AuthUser/user.model"));
cumulativeprice_interface_1.CumulativePrice.init({
    id: {
        type: sequelize_1.DataTypes.STRING(50),
        primaryKey: true,
        allowNull: false,
    },
    fee: {
        type: sequelize_1.DataTypes.DECIMAL,
        allowNull: false,
    },
    date: {
        type: sequelize_1.DataTypes.STRING(30),
        allowNull: true,
    },
    user_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    inventory_id: {
        type: sequelize_1.DataTypes.STRING(30),
        allowNull: false,
    },
}, {
    sequelize: config_database_1.sequelize,
    modelName: "CumulativePrice",
    tableName: "cumulativeprice",
    timestamps: false,
});
inventory_model_1.default.hasMany(cumulativeprice_interface_1.CumulativePrice, { foreignKey: "inventory_id" });
cumulativeprice_interface_1.CumulativePrice.belongsTo(inventory_model_1.default, { foreignKey: "inventory_id" });
cumulativeprice_interface_1.CumulativePrice.belongsTo(user_model_1.default, { foreignKey: "user_id" });
exports.default = cumulativeprice_interface_1.CumulativePrice;
