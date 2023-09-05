"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.celebrateError = void 0;
const celebrate_1 = require("celebrate");
const celebrateError = (err, req, res, next) => {
    if ((0, celebrate_1.isCelebrateError)(err)) {
        const [errorDetail] = err.details.get("body").details;
        return res.status(400).json({
            ok: false,
            message: errorDetail.message,
        });
    }
    return next(err);
};
exports.celebrateError = celebrateError;
