"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleHttp = void 0;
const handleHttp = (res, errorRaw) => {
    return res.status(500).send({ errorRaw });
};
exports.handleHttp = handleHttp;
