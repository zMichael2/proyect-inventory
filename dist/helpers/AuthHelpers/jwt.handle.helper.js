"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const generateToken = (name, email) => {
    const jwt = (0, jsonwebtoken_1.sign)({ name, email }, JWT_SECRET, {
        expiresIn: "2h",
    });
    return jwt;
};
exports.generateToken = generateToken;
const verifyToken = (jwt) => {
    const isOk = (0, jsonwebtoken_1.verify)(jwt, JWT_SECRET);
    return isOk;
};
exports.verifyToken = verifyToken;
