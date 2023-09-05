"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const celebrate_1 = require("celebrate");
const celebrateError_middleware_1 = require("../middleware/celebrateError.middleware");
const validateFields_helper_1 = require("../helpers/validateFields.helper");
const auth_controller_1 = require("../controllers/auth.controller");
const authRouter = (0, express_1.Router)();
authRouter.post("/register", [(0, celebrate_1.celebrate)(validateFields_helper_1.userRegisterValidator)], auth_controller_1.authRegisterUser);
authRouter.post("/login", [(0, celebrate_1.celebrate)(validateFields_helper_1.userLoginValidator)], auth_controller_1.authLoginUser);
authRouter.get("/verification/:email/:code", auth_controller_1.checkCode);
authRouter.get("/changePasswordVerificate/:email", auth_controller_1.changePasswordCheck);
authRouter.get("/verficatePassword/:email/:code/:password", [(0, celebrate_1.celebrate)(validateFields_helper_1.celebrateCheckPass)], auth_controller_1.verficatePassword);
authRouter.use(celebrateError_middleware_1.celebrateError);
exports.default = authRouter;
