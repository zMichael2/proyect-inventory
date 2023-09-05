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
exports.updatedInventory = exports.totalPiceComplete = exports.totalPiceNotPayed = exports.deleteInventory = exports.setCumulative = exports.getInventoryId = exports.getInventory = exports.createInventory = void 0;
const error_handle_helper_1 = require("../helpers/error.handle.helper");
const inventory_service_1 = require("../services/inventory.service");
const createInventory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = req;
        const response = yield (0, inventory_service_1.newInventory)(body);
        if (response.isError) {
            return res.status(406).json({ message: response.message });
        }
        res.status(201).json({ data: response.data, message: response.message });
    }
    catch (e) {
        (0, error_handle_helper_1.handleHttp)(res, e);
    }
});
exports.createInventory = createInventory;
const getInventory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, inventory_service_1.getInventoryActive)();
        res.status(200).json({ data: response.data });
    }
    catch (e) {
        (0, error_handle_helper_1.handleHttp)(res, e);
    }
});
exports.getInventory = getInventory;
const getInventoryId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.params;
        const response = yield (0, inventory_service_1.getInventoryById)(email);
        if (response.isError) {
            return res.status(406).json({ message: response.message });
        }
        res.status(200).json({ data: response.data });
    }
    catch (e) {
        (0, error_handle_helper_1.handleHttp)(res, e);
    }
});
exports.getInventoryId = getInventoryId;
const setCumulative = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = req;
        const response = yield (0, inventory_service_1.cumulativeFee)(body);
        if (response.isError) {
            return res.status(406).json({ message: response.message });
        }
        res.status(200).json({ data: response.data });
    }
    catch (e) {
        (0, error_handle_helper_1.handleHttp)(res, e);
    }
});
exports.setCumulative = setCumulative;
const deleteInventory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        const response = yield (0, inventory_service_1.isActiveInventory)(id);
        if (response.isError) {
            return res.status(406).json({ message: response.message });
        }
        res.status(200).json({ message: response.message });
    }
    catch (e) {
        (0, error_handle_helper_1.handleHttp)(res, e);
    }
});
exports.deleteInventory = deleteInventory;
const totalPiceNotPayed = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, inventory_service_1.TotalNotPayed)();
        res.status(200).json({ data: { fullAmountNotPaid: response } });
    }
    catch (e) {
        (0, error_handle_helper_1.handleHttp)(res, e);
    }
});
exports.totalPiceNotPayed = totalPiceNotPayed;
const totalPiceComplete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, inventory_service_1.totalPiceIsComplete)();
        res.status(200).json({ data: { fullAmountComplete: response } });
    }
    catch (e) {
        (0, error_handle_helper_1.handleHttp)(res, e);
    }
});
exports.totalPiceComplete = totalPiceComplete;
const updatedInventory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = req;
        const response = yield (0, inventory_service_1.modifyInventory)(body);
        if (response.isError) {
            return res.status(406).json({ message: response.message });
        }
        res.status(200).json({ message: response.message });
    }
    catch (e) {
        (0, error_handle_helper_1.handleHttp)(res, e);
    }
});
exports.updatedInventory = updatedInventory;
