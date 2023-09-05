"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDatabase = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const nameBd = `${process.env.NAMEBD}`;
const userBd = `${process.env.USERBD}`;
const passwordBd = `${process.env.PASSBD}`;
const host = `${process.env.HOST}`;
const sequelize = new sequelize_1.Sequelize(nameBd, userBd, passwordBd, {
    host: host,
    dialect: "mysql",
});
exports.sequelize = sequelize;
const connectDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield sequelize.authenticate();
        console.log("Database connection established successfully.");
    }
    catch (error) {
        console.error("Error connecting to database:", error);
    }
});
exports.connectDatabase = connectDatabase;
