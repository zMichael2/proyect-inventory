"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_database_1 = require("../../database/config.database");
const verification_interface_1 = require("../../interface/verification.interface");
verification_interface_1.Verification.init({
    verification_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    verification_code: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: true,
        defaultValue: null,
    },
    isactivate: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    isactivatechange: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    sequelize: config_database_1.sequelize,
    modelName: "Verification",
    tableName: "verification",
    timestamps: false,
});
exports.default = verification_interface_1.Verification;
