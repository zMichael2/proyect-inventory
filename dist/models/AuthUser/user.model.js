"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_database_1 = require("../../database/config.database");
const verification_model_1 = __importDefault(require("./verification.model"));
const rol_model_1 = __importDefault(require("./rol.model"));
const user_interface_1 = require("../../interface/user.interface");
user_interface_1.User.init({
    user_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    name_user: {
        type: sequelize_1.DataTypes.STRING(40),
        allowNull: false,
    },
    email_user: {
        type: sequelize_1.DataTypes.STRING(30),
        allowNull: false,
        unique: true,
    },
    password_user: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: false,
    },
    verification: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: verification_model_1.default,
            key: "verification_id",
        },
    },
    rol: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: rol_model_1.default,
            key: "rol_id",
        },
    },
    created_at: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
}, {
    sequelize: config_database_1.sequelize,
    modelName: "User",
    tableName: "users",
    timestamps: false,
});
user_interface_1.User.belongsTo(verification_model_1.default, {
    foreignKey: "verification",
    targetKey: "verification_id",
}); //indica donde estas colocando la llave foranea
verification_model_1.default.hasOne(user_interface_1.User, {
    foreignKey: "verification",
    sourceKey: "verification_id",
}); //uno a uno - leer documentación
exports.default = user_interface_1.User;
