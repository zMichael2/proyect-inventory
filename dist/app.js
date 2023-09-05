"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const auth_router_1 = __importDefault(require("./routers/auth.router"));
const config_database_1 = require("./database/config.database");
const inventory_router_1 = __importDefault(require("./routers/inventory.router"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
(0, config_database_1.connectDatabase)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.status(200).json({ message: "Api rest auth security initialized " });
});
app.use(auth_router_1.default);
app.use(inventory_router_1.default);
app.listen(PORT, () => {
    console.log("Initialized Server!!!");
});
