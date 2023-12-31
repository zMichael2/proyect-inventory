"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const celebrate_1 = require("celebrate");
const celebrateError_middleware_1 = require("../middleware/celebrateError.middleware");
const inventory_controller_1 = require("../controllers/inventory.controller");
const validateFields_helper_1 = require("../helpers/validateFields.helper");
const jwtTokenValidate_middleware_1 = require("../middleware/jwtTokenValidate.middleware");
const inventoryRouter = (0, express_1.Router)();
inventoryRouter.post("/createinventory", [jwtTokenValidate_middleware_1.checkJwt, (0, celebrate_1.celebrate)(validateFields_helper_1.createInvValidato)], inventory_controller_1.createInventory);
inventoryRouter.get("/getinventory", inventory_controller_1.getInventory);
inventoryRouter.get("/getinventory/:email", inventory_controller_1.getInventoryId);
inventoryRouter.post("/setcumulative", [(0, celebrate_1.celebrate)(validateFields_helper_1.createFeeValidato)], inventory_controller_1.setCumulative);
inventoryRouter.post("/deleteinventory", [(0, celebrate_1.celebrate)(validateFields_helper_1.idInventoryValidator)], inventory_controller_1.deleteInventory);
inventoryRouter.get("/totalpice/notpayed", inventory_controller_1.totalPiceNotPayed);
inventoryRouter.get("/totalpice/complete", inventory_controller_1.totalPiceComplete);
inventoryRouter.post("/updateinventory", [(0, celebrate_1.celebrate)(validateFields_helper_1.updateInvValidator)], inventory_controller_1.updatedInventory);
inventoryRouter.use(celebrateError_middleware_1.celebrateError);
exports.default = inventoryRouter;
