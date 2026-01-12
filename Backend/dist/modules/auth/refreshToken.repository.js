"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.revokeToken = exports.findValidToken = exports.createToken = void 0;
const refreshToken_model_1 = __importDefault(require("./refreshToken.model"));
const createToken = (data) => refreshToken_model_1.default.create(data);
exports.createToken = createToken;
const findValidToken = (tokenHash) => refreshToken_model_1.default.findOne({ tokenHash, isRevoked: false });
exports.findValidToken = findValidToken;
const revokeToken = (id) => refreshToken_model_1.default.findByIdAndUpdate(id, { isRevoked: true });
exports.revokeToken = revokeToken;
//# sourceMappingURL=refreshToken.repository.js.map