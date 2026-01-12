"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const auth_model_1 = require("../auth/auth.model");
class UserRepository {
    async create(userData) {
        const user = new auth_model_1.User(userData);
        return await user.save();
    }
    async findByEmail(email) {
        return await auth_model_1.User.findOne({ email });
    }
    async findById(id) {
        return await auth_model_1.User.findById(id).select("-password");
    }
}
exports.UserRepository = UserRepository;
//# sourceMappingURL=auth.repository.js.map