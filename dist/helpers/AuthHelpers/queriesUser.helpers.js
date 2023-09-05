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
exports.codeCorrectPass = exports.correctCodeUser = exports.updatePassword = exports.getIdVerificationChanger = exports.generateCodePass = exports.updateVerificationCode = exports.getIdVerificationUser = exports.createVerificationUser = exports.getUsersByEmail = void 0;
const sequelize_1 = require("sequelize");
const config_database_1 = require("../../database/config.database");
const user_model_1 = __importDefault(require("../../models/AuthUser/user.model"));
const verification_model_1 = __importDefault(require("../../models/AuthUser/verification.model"));
const generateCode_helper_1 = require("./generateCode.helper");
const constants_helper_1 = require("../constants.helper");
const getUsersByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findOne({
        where: {
            email_user: {
                [sequelize_1.Op.eq]: email,
            },
        },
    });
    return user;
});
exports.getUsersByEmail = getUsersByEmail;
const createVerificationUser = () => __awaiter(void 0, void 0, void 0, function* () {
    const newVerification = yield verification_model_1.default.create({
        verification_code: (0, generateCode_helper_1.generateVerificationCode)(),
        isactivate: false,
        isactivatechange: false,
    });
    return {
        id: newVerification.verification_id,
        code: newVerification.verification_code,
    };
});
exports.createVerificationUser = createVerificationUser;
const updateVerificationCode = (verificationId) => __awaiter(void 0, void 0, void 0, function* () {
    const newCode = (0, generateCode_helper_1.generateVerificationCode)();
    yield verification_model_1.default.update({ verification_code: newCode }, { where: { verification_id: verificationId } });
    return newCode;
});
exports.updateVerificationCode = updateVerificationCode;
const getIdVerificationUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield verification_model_1.default.findOne({
        where: {
            verification_id: id,
        },
    });
    if (!(users === null || users === void 0 ? void 0 : users.isactivate)) {
        return null;
    }
    return users;
});
exports.getIdVerificationUser = getIdVerificationUser;
const correctCodeUser = (checkCode) => __awaiter(void 0, void 0, void 0, function* () {
    const isCorrect = yield user_model_1.default.findOne({
        include: [
            {
                model: verification_model_1.default,
                attributes: ["isactivate"],
                where: {
                    verification_code: checkCode.code,
                },
            },
        ],
        where: {
            email_user: checkCode.email,
        },
    });
    if (!isCorrect) {
        return { message: constants_helper_1.messageText.INCORRECT_CODE, isError: true };
    }
    yield verification_model_1.default.update({ isactivate: true, verification_code: null }, {
        where: {
            verification_id: config_database_1.sequelize.literal(`(
          SELECT verification_id FROM users
          WHERE email_user = '${checkCode.email}'
          LIMIT 1
        )`),
        },
    });
    return { message: constants_helper_1.messageText.SUCCESSFULLY_VERFIFIED, isError: false };
});
exports.correctCodeUser = correctCodeUser;
const generateCodePass = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const code = (0, generateCode_helper_1.generateVerificationCode)();
    yield verification_model_1.default.update({ isactivatechange: true, verification_code: code }, {
        where: {
            verification_id: config_database_1.sequelize.literal(`(
          SELECT verification_id FROM users
          WHERE email_user = '${email}'
          LIMIT 1
        )`),
        },
    });
    return code;
});
exports.generateCodePass = generateCodePass;
const getIdVerificationChanger = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield verification_model_1.default.findOne({
        where: {
            verification_id: id,
        },
    });
    if (!(users === null || users === void 0 ? void 0 : users.isactivatechange)) {
        return null;
    }
    return users;
});
exports.getIdVerificationChanger = getIdVerificationChanger;
const codeCorrectPass = (checkCode) => __awaiter(void 0, void 0, void 0, function* () {
    const isCorrect = yield user_model_1.default.findOne({
        include: [
            {
                model: verification_model_1.default,
                attributes: ["isactivatechange"],
                where: {
                    verification_code: checkCode.code,
                },
            },
        ],
        where: {
            email_user: checkCode.email,
        },
    });
    if (!isCorrect) {
        return null;
    }
    yield verification_model_1.default.update({ isactivatechange: false, verification_code: null }, {
        where: {
            verification_id: config_database_1.sequelize.literal(`(
            SELECT verification_id FROM users
            WHERE email_user = '${checkCode.email}'
            LIMIT 1
          )`),
        },
    });
    return { message: constants_helper_1.messageText.SUCCESSFULLY_VERFIFIED, isError: false };
});
exports.codeCorrectPass = codeCorrectPass;
const updatePassword = (userId, newPassword) => __awaiter(void 0, void 0, void 0, function* () {
    yield user_model_1.default.update({ password_user: newPassword }, { where: { user_id: userId } });
});
exports.updatePassword = updatePassword;
