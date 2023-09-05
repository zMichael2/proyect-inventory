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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.modifyInventory = exports.totalPiceIsComplete = exports.TotalNotPayed = exports.isActiveInventory = exports.cumulativeFee = exports.getInventoryById = exports.getInventoryActive = exports.newInventory = void 0;
const uid_1 = require("uid");
const inventory_model_1 = __importDefault(require("../models/Inventory/inventory.model"));
const cumulativeprice_mode_1 = __importDefault(require("../models/Inventory/cumulativeprice.mode"));
const user_model_1 = __importDefault(require("../models/AuthUser/user.model"));
const datetimeus_helper_1 = require("../helpers/datetimeus.helper");
const queriesUser_helpers_1 = require("../helpers/AuthHelpers/queriesUser.helpers");
const constants_helper_1 = require("../helpers/constants.helper");
const queriesInventory_helper_1 = require("../helpers/Inventory/queriesInventory.helper");
const newInventory = (invParams) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const date = invParams.date;
        const user = yield (0, queriesUser_helpers_1.getUsersByEmail)(invParams.email);
        const info = {
            id: (0, uid_1.uid)(),
            user_id: user === null || user === void 0 ? void 0 : user.user_id,
            description: invParams.description,
            total_price: invParams.totalPrice,
            neighborhood: invParams.neighborhood,
            date: invParams.date,
            payment_end_day: invParams.payment_end_day,
        };
        if (!user) {
            return {
                message: constants_helper_1.messageText.ACCOUNT_DOES_NOT_EXIST,
                isError: true,
            };
        }
        if (!date) {
            const dateTinme = (0, datetimeus_helper_1.getDateInUSTimezone)();
            Object.assign(info, { date: dateTinme });
        }
        const inventory = yield inventory_model_1.default.create(info);
        return {
            //mejora mapName
            data: {
                id: inventory.id,
                user: user.name_user,
                description: inventory.description,
                total_price: inventory.total_price,
                price_paid: inventory.price_paid,
                neighborhood: inventory.neighborhood,
                date: inventory.date,
                payment_end_day: inventory.payment_end_day,
            },
            isError: false,
            message: constants_helper_1.messageText.INVENTORY_CREATED_SUCCESSFULLY,
        };
    }
    catch (e) {
        console.log(e);
        throw constants_helper_1.messageText.ERROR_DATA_BASE;
    }
});
exports.newInventory = newInventory;
const getInventoryActive = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const inventories = yield inventory_model_1.default.findAll({
            attributes: [
                "id",
                "description",
                "total_price",
                "price_paid",
                "neighborhood",
                "date",
                "payment_end_day",
            ],
            where: {
                isactive: true,
                pending_debt: false,
                iscompleted: false,
            },
            include: [
                {
                    model: user_model_1.default,
                    attributes: ["email_user"],
                },
            ],
        });
        return {
            data: { inventories },
        };
    }
    catch (e) {
        console.log(e);
        throw constants_helper_1.messageText.ERROR_DATA_BASE;
    }
});
exports.getInventoryActive = getInventoryActive;
const getInventoryById = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, queriesUser_helpers_1.getUsersByEmail)(email);
        if (!user) {
            return {
                message: constants_helper_1.messageText.ACCOUNT_DOES_NOT_EXIST,
                isError: true,
            };
        }
        const inventories = yield inventory_model_1.default.findAll({
            attributes: [
                "id",
                "description",
                "total_price",
                "price_paid",
                "neighborhood",
                "date",
                "payment_end_day",
            ],
            where: {
                isactive: true,
                pending_debt: false,
                user_id: user === null || user === void 0 ? void 0 : user.user_id,
            },
            include: [
                {
                    model: user_model_1.default,
                    attributes: ["email_user"],
                },
            ],
        });
        return {
            data: { inventories },
        };
    }
    catch (e) {
        console.log(e);
        throw constants_helper_1.messageText.ERROR_DATA_BASE;
    }
});
exports.getInventoryById = getInventoryById;
const cumulativeFee = (feeParams) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dateExist = feeParams.date;
        const userAndInventory = yield (0, queriesInventory_helper_1.findInventoryAndUser)(feeParams.email, feeParams.inventory);
        if (!userAndInventory) {
            return {
                message: constants_helper_1.messageText.USER_OR_INVENTORY_DOES_NOT_EXIST,
                isError: true,
            };
        }
        const totalPaid = yield (0, queriesInventory_helper_1.getTotalFeeForUserAndInventory)(userAndInventory.user_id, feeParams.inventory);
        const info = {
            id: (0, uid_1.uid)(),
            fee: feeParams.amount,
            user_id: userAndInventory.user_id,
            inventory_id: feeParams.inventory,
        };
        if (!dateExist) {
            const dateTinme = (0, datetimeus_helper_1.getDateInUSTimezone)();
            Object.assign(info, { date: dateTinme });
        }
        if (totalPaid + feeParams.amount > Number(userAndInventory.total_price)) {
            return {
                message: constants_helper_1.messageText.VALUE_EXCEEDS_TOTAL_DEBT,
                isError: true,
            };
        }
        if (totalPaid + feeParams.amount === Number(userAndInventory.total_price)) {
            yield (0, queriesInventory_helper_1.isComplete)(feeParams.inventory);
        }
        const fee = yield cumulativeprice_mode_1.default.create(info);
        yield (0, queriesInventory_helper_1.updatePricePaid)(feeParams.inventory, totalPaid + feeParams.amount);
        return {
            data: {
                fee,
                total_price: userAndInventory.total_price,
                price_paid: totalPaid + feeParams.amount,
            },
        };
    }
    catch (e) {
        console.log(e);
        throw constants_helper_1.messageText.ERROR_DATA_BASE;
    }
});
exports.cumulativeFee = cumulativeFee;
const isActiveInventory = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isInventoryExist = yield (0, queriesInventory_helper_1.inventoryExist)(id);
        if (!isInventoryExist) {
            return {
                message: constants_helper_1.messageText.THE_INVENTORY_DOES_NOT_EXIST,
                isError: true,
            };
        }
        yield inventory_model_1.default.update({ isactive: false }, {
            where: {
                id: id,
            },
        });
        return {
            message: constants_helper_1.messageText.THE_ELIMINATED_INVENTORY,
        };
    }
    catch (e) {
        console.log(e);
        throw constants_helper_1.messageText.ERROR_DATA_BASE;
    }
});
exports.isActiveInventory = isActiveInventory;
const TotalNotPayed = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield inventory_model_1.default.sum("total_price", {
            where: {
                pending_debt: true,
            },
        });
        return result;
    }
    catch (e) {
        console.log(e);
        throw constants_helper_1.messageText.ERROR_DATA_BASE;
    }
});
exports.TotalNotPayed = TotalNotPayed;
const totalPiceIsComplete = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield inventory_model_1.default.sum("total_price", {
            where: {
                iscompleted: true,
            },
        });
        return result;
    }
    catch (e) {
        console.log(e);
        throw constants_helper_1.messageText.ERROR_DATA_BASE;
    }
});
exports.totalPiceIsComplete = totalPiceIsComplete;
const modifyInventory = (updateInvParams) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = updateInvParams, inventaryParam = __rest(updateInvParams, ["id"]);
        const isInventoryExist = yield (0, queriesInventory_helper_1.inventoryExist)(id);
        if (!isInventoryExist) {
            return {
                message: constants_helper_1.messageText.THE_INVENTORY_DOES_NOT_EXIST,
                isError: true,
            };
        }
        const updatedInventory = yield inventory_model_1.default.update(inventaryParam, {
            where: {
                id: id,
            },
        });
        return {
            message: constants_helper_1.messageText.INVENTORY_UPDATED_CORRECTLY,
        };
    }
    catch (e) {
        console.log(e);
        throw constants_helper_1.messageText.ERROR_DATA_BASE;
    }
});
exports.modifyInventory = modifyInventory;
