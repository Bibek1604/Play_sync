"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
class CategoryService {
    constructor(categoryRepo) {
        this.categoryRepo = categoryRepo;
    }
    async createCategory(dto, adminId) {
        if (!["online", "offline"].includes(dto.type)) {
            throw new Error("Invalid category type");
        }
        const existing = await this.categoryRepo.findByName(dto.name);
        if (existing) {
            throw new Error("Category already exists");
        }
        return this.categoryRepo.create({
            ...dto,
            createdBy: adminId,
        });
    }
    async updateCategory(id, dto) {
        const category = await this.categoryRepo.findById(id);
        if (!category) {
            throw new Error("Category not found");
        }
        return this.categoryRepo.updateById(id, dto);
    }
    async deleteCategory(id) {
        const category = await this.categoryRepo.findById(id);
        if (!category) {
            throw new Error("Category not found");
        }
        return this.categoryRepo.deleteById(id);
    }
    async getAllCategories() {
        return this.categoryRepo.findAll();
    }
}
exports.CategoryService = CategoryService;
//# sourceMappingURL=category.service.js.map