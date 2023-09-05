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
exports.verficateUser = exports.verficateChangePass = exports.checkChangePassword = exports.loginUser = exports.registerUser = void 0;
const user_model_1 = __importDefault(require("../models/AuthUser/user.model"));
const bcrypt_handle_1 = require("../helpers/AuthHelpers/bcrypt.handle");
const constants_helper_1 = require("../helpers/constants.helper");
const jwt_handle_helper_1 = require("../helpers/AuthHelpers/jwt.handle.helper");
const queriesUser_helpers_1 = require("../helpers/AuthHelpers/queriesUser.helpers");
const notificationEmail_service_1 = require("./notificationEmail.service");
const registerUser = (userParameters) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, queriesUser_helpers_1.getUsersByEmail)(userParameters.email_user);
        if (!user) {
            const passwordHash = yield (0, bcrypt_handle_1.encrypt)(userParameters.password_user);
            const infoVerificateUser = yield (0, queriesUser_helpers_1.createVerificationUser)();
            yield user_model_1.default.create({
                name_user: userParameters.name_user,
                email_user: userParameters.email_user,
                password_user: passwordHash,
                verification: infoVerificateUser.id,
                rol: 1,
            });
            yield (0, notificationEmail_service_1.emailSendConfimed)(userParameters.email_user, infoVerificateUser.code);
            return {
                message: {
                    name: userParameters.name_user,
                    email: userParameters.email_user,
                    state: "to confirm the code",
                },
                isError: false,
            };
        }
        const updateNewcode = yield (0, queriesUser_helpers_1.updateVerificationCode)(user.verification);
        yield (0, notificationEmail_service_1.emailSendConfimed)(user.email_user, updateNewcode);
        return { message: constants_helper_1.messageText.EMAIL_ALREADY_REGISTERED, isError: true };
    }
    catch (e) {
        console.log(e);
        throw constants_helper_1.messageText.ERROR_DATA_BASE;
    }
});
exports.registerUser = registerUser;
const loginUser = (userParameters) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, queriesUser_helpers_1.getUsersByEmail)(userParameters.email_user);
        if (!user) {
            return {
                message: constants_helper_1.messageText.ACCOUNT_DOES_NOT_EXIST,
                isError: true,
            };
        }
        const isActive = yield (0, queriesUser_helpers_1.getIdVerificationUser)(user.verification);
        const passwordCorrect = yield (0, bcrypt_handle_1.verified)(userParameters.password_user, user.password_user);
        if (!passwordCorrect) {
            return {
                message: constants_helper_1.messageText.INCORRECT_PASSWORD,
                isError: true,
            };
        }
        if (!isActive) {
            return { message: constants_helper_1.messageText.ACCOUNT_DOES_NOT_EXIST, isError: true };
        }
        const token = (0, jwt_handle_helper_1.generateToken)(user.name_user, user.email_user);
        return {
            message: { name: user.name_user, email: user.email_user, token: token },
            isError: false,
        };
    }
    catch (e) {
        console.log(e);
        throw constants_helper_1.messageText.ERROR_DATA_BASE;
    }
});
exports.loginUser = loginUser;
const verficateUser = (checkCode) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, queriesUser_helpers_1.correctCodeUser)(checkCode);
        const { message, isError } = result;
        return { message, isError };
    }
    catch (error) {
        console.log(error);
        throw constants_helper_1.messageText.ERROR_DATA_BASE;
    }
});
exports.verficateUser = verficateUser;
const checkChangePassword = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, queriesUser_helpers_1.getUsersByEmail)(email);
        if (!user) {
            return { message: constants_helper_1.messageText.ACCOUNT_DOES_NOT_EXIST, isError: true };
        }
        const code = yield (0, queriesUser_helpers_1.generateCodePass)(user.email_user);
        yield (0, notificationEmail_service_1.emailSendConfimedChange)(user.email_user, code);
        return { message: constants_helper_1.messageText.EMAIL_WITH_CHANGE_PASS_SENT, isError: false };
    }
    catch (e) {
        console.log(e);
        throw constants_helper_1.messageText.ERROR_DATA_BASE;
    }
});
exports.checkChangePassword = checkChangePassword;
const verficateChangePass = (verificateCode) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, queriesUser_helpers_1.getUsersByEmail)(verificateCode.email);
        if (!user) {
            return {
                message: constants_helper_1.messageText.ACCOUNT_DOES_NOT_EXIST,
                isError: true,
            };
        }
        const isActive = yield (0, queriesUser_helpers_1.getIdVerificationChanger)(user.verification); //se puede mejorar
        const codeCorrect = yield (0, queriesUser_helpers_1.codeCorrectPass)({
            email: user.email_user,
            code: verificateCode.code,
        });
        if (!isActive) {
            return { message: constants_helper_1.messageText.PASSWORD_IS_NOT_ACTIVED, isError: true };
        }
        if (!codeCorrect) {
            return { message: constants_helper_1.messageText.INCORRECT_CODE, isError: true };
        }
        const passwordHash = yield (0, bcrypt_handle_1.encrypt)(verificateCode.password);
        yield (0, queriesUser_helpers_1.updatePassword)(user.user_id, passwordHash);
        yield (0, notificationEmail_service_1.verifiedEmailChnage)(verificateCode.email);
        return {
            message: constants_helper_1.messageText.PASSWORD_CHANGED_SUCCESFULLY,
            isError: false,
        };
    }
    catch (e) {
        throw constants_helper_1.messageText.ERROR_DATA_BASE;
    }
});
exports.verficateChangePass = verficateChangePass;
