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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isComplete = exports.inventoryExist = exports.updatePricePaid = exports.getTotalFeeForUserAndInventory = exports.findInventoryAndUser = void 0;
const inventory_model_1 = __importDefault(require("../../models/Inventory/inventory.model"));
const user_model_1 = __importDefault(require("../../models/AuthUser/user.model"));
const cumulativeprice_mode_1 = __importDefault(require("../../models/Inventory/cumulativeprice.mode"));
const config_database_1 = require("../../database/config.database");
const findInventoryAndUser = (email, inventoryId) => __awaiter(void 0, void 0, void 0, function* () {
    const inventory = yield inventory_model_1.default.findOne({
        attributes: ["user_id", "total_price"],
        where: {
            id: inventoryId,
            isactive: true,
        },
        include: [
            {
                model: user_model_1.default,
                attributes: [],
                where: {
                    email_user: email,
                },
            },
        ],
    });
    return inventory;
});
exports.findInventoryAndUser = findInventoryAndUser;
const getTotalFeeForUserAndInventory = (userId, inventoryId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cumulativeprice_mode_1.default.findOne({
        attributes: [[config_database_1.sequelize.fn("SUM", config_database_1.sequelize.col("fee")), "total_fee"]],
        where: {
            user_id: userId,
            inventory_id: inventoryId,
        },
    });
    if (result && result.getDataValue("total_fee") !== null) {
        return Number(result.getDataValue("total_fee"));
    }
    else {
        return 0;
    }
});
exports.getTotalFeeForUserAndInventory = getTotalFeeForUserAndInventory;
const isComplete = (inventory) => __awaiter(void 0, void 0, void 0, function* () {
    yield inventory_model_1.default.update({ iscompleted: true }, {
        where: {
            id: inventory,
        },
    });
});
exports.isComplete = isComplete;
const updatePricePaid = (inventory, pricePaid) => __awaiter(void 0, void 0, void 0, function* () {
    yield inventory_model_1.default.update({ price_paid: pricePaid }, {
        where: {
            id: inventory,
        },
    });
});
exports.updatePricePaid = updatePricePaid;
const inventoryExist = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const inventory = yield inventory_model_1.default.findOne({
        attributes: ["user_id", "total_price"],
        where: {
            id: id,
            isactive: true,
        },
    });
    return inventory;
});
exports.inventoryExist = inventoryExist;
