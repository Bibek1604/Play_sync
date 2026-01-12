"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateDto = void 0;
const appError_1 = require("./appError");
const validateDto = (schema) => (req, _res, next) => {
    try {
        req.body = schema.parse(req.body);
        next();
    }
    catch (err) {
        next(new appError_1.AppError(err.errors[0].message, 400));
    }
};
exports.validateDto = validateDto;
//# sourceMappingURL=validateDto.js.map