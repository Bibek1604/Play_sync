"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRepository = void 0;
const category_model_1 = require("./category.model");
class CategoryRepository {
    async findByName(name) {
        return category_model_1.CategoryModel.findOne({ name });
    }
    async create(data) {
        return category_model_1.CategoryModel.create(data);
    }
    async findAllActive() {
        return category_model_1.CategoryModel.find({ isActive: true }).sort({ createdAt: -1 });
    }
    async updateById(id, data) {
        return category_model_1.CategoryModel.findByIdAndUpdate(id, data, { new: true });
    }
    async deleteById(id) {
        return category_model_1.CategoryModel.findByIdAndDelete(id);
    }
    async findById(id) {
        return category_model_1.CategoryModel.findById(id);
    }
    async findAll() {
        return category_model_1.CategoryModel.find().sort({ createdAt: -1 });
    }
}
exports.CategoryRepository = CategoryRepository;
//# sourceMappingURL=category.repository.js.map