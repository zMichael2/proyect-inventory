"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_database_1 = require("../../database/config.database");
const rol_interface_1 = require("../../interface/rol.interface");
rol_interface_1.Rol.init({
    rol_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    roles: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: false,
        unique: true,
    },
}, {
    sequelize: config_database_1.sequelize,
    modelName: "Rol",
    tableName: "rol",
    timestamps: false,
});
exports.default = rol_interface_1.Rol;
