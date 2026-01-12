"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = exports.findAll = exports.findById = void 0;
const user_model_1 = __importDefault(require("./user.model"));
const findById = (id) => {
    return user_model_1.default.findById(id).select("-password");
};
exports.findById = findById;
const findAll = () => {
    return user_model_1.default.find().select("-password");
};
exports.findAll = findAll;
const create = (userData) => {
    const user = new user_model_1.default(userData);
    return user.save();
};
exports.create = create;
//# sourceMappingURL=user.repository.js.map