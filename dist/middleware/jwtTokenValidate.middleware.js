"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkJwt = void 0;
const jwt_handle_helper_1 = require("../helpers/AuthHelpers/jwt.handle.helper");
const checkJwt = (req, res, next) => {
    try {
        const jwtByUser = req.header("x-token");
        const isUser = (0, jwt_handle_helper_1.verifyToken)(`${jwtByUser}`);
        console.log(isUser);
        if (!isUser) {
            res.status(401).json({ message: "NO_VALID_TOKEN" });
        }
        req.user = isUser.name;
        req.email = isUser.email;
        next();
    }
    catch (error) {
        res.status(402).send({ message: "SESSION_NO_VALID" });
    }
};
exports.checkJwt = checkJwt;
