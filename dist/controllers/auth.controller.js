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
exports.verficatePassword = exports.changePasswordCheck = exports.checkCode = exports.authLoginUser = exports.authRegisterUser = void 0;
const auth_service_1 = require("../services/auth.service");
const error_handle_helper_1 = require("../helpers/error.handle.helper");
const notificationEmail_service_1 = require("../services/notificationEmail.service");
const authRegisterUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = req;
        const response = yield (0, auth_service_1.registerUser)(body);
        if (response.isError) {
            return res.status(406).json({ message: response.message });
        }
        res.status(201).json({ data: [response.message] });
    }
    catch (e) {
        (0, error_handle_helper_1.handleHttp)(res, e);
    }
});
exports.authRegisterUser = authRegisterUser;
const authLoginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = req;
        const response = yield (0, auth_service_1.loginUser)(body);
        if (response.isError) {
            return res.status(406).json({ message: response.message });
        }
        res.status(200).json({ message: response.message });
    }
    catch (e) {
        (0, error_handle_helper_1.handleHttp)(res, e);
    }
});
exports.authLoginUser = authLoginUser;
const checkCode = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { code, email } = req.params;
        const response = yield (0, auth_service_1.verficateUser)({ code, email });
        if (response.isError) {
            return res.status(406).json({ message: response.message });
        }
        yield (0, notificationEmail_service_1.verifiedEmail)(email);
        res.status(200).json({ message: response.message });
    }
    catch (e) {
        (0, error_handle_helper_1.handleHttp)(res, e);
    }
});
exports.checkCode = checkCode;
const changePasswordCheck = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.params;
        const response = yield (0, auth_service_1.checkChangePassword)(email);
        if (response === null || response === void 0 ? void 0 : response.isError) {
            return res.status(406).json({ message: response.message });
        }
        res.status(200).json({ message: response.message });
    }
    catch (e) {
        (0, error_handle_helper_1.handleHttp)(res, e);
    }
});
exports.changePasswordCheck = changePasswordCheck;
const verficatePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, code, password } = req.params;
        const response = yield (0, auth_service_1.verficateChangePass)({ email, code, password });
        if (response === null || response === void 0 ? void 0 : response.isError) {
            return res.status(406).json({ message: response.message });
        }
        res.status(200).json({ message: response.message });
    }
    catch (e) {
        (0, error_handle_helper_1.handleHttp)(res, e);
    }
});
exports.verficatePassword = verficatePassword;
