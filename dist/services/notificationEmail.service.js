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
exports.verifiedEmailChnage = exports.emailSendConfimedChange = exports.verifiedEmail = exports.emailSendConfimed = void 0;
const axios_1 = __importDefault(require("axios"));
const emailSendConfimed = (email, code) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authOptions = {
            method: "post",
            url: `${process.env.LINKEMAIL}/api/emailcode`,
            data: {
                email: email,
                code: code,
                type: "verificate",
            },
        };
        yield (0, axios_1.default)(authOptions);
    }
    catch (error) {
        console.error(error);
        throw "Could not connect to mail service";
    }
});
exports.emailSendConfimed = emailSendConfimed;
const verifiedEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authOptions = {
            method: "post",
            url: `${process.env.LINKEMAIL}/api/emailcode`,
            data: {
                email: email,
                type: "verificateConfirmed",
            },
        };
        yield (0, axios_1.default)(authOptions);
    }
    catch (error) {
        throw "The confirmation email could not be sent correctly";
    }
});
exports.verifiedEmail = verifiedEmail;
const emailSendConfimedChange = (email, code) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authOptions = {
            method: "post",
            url: `${process.env.LINKEMAIL}/api/emailcode`,
            data: {
                email: email,
                code: code,
                type: "changePassword",
            },
        };
        yield (0, axios_1.default)(authOptions);
    }
    catch (error) {
        console.error(error);
        throw "Could not connect to mail service";
    }
});
exports.emailSendConfimedChange = emailSendConfimedChange;
const verifiedEmailChnage = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authOptions = {
            method: "post",
            url: `${process.env.LINKEMAIL}/api/emailcode`,
            data: {
                email: email,
                type: "changeConfirmation",
            },
        };
        yield (0, axios_1.default)(authOptions);
    }
    catch (error) {
        throw "The confirmation email could not be sent correctly";
    }
});
exports.verifiedEmailChnage = verifiedEmailChnage;
