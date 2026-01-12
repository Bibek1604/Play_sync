"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryController = void 0;
const category_service_1 = require("./category.service");
const category_repository_1 = require("./category.repository");
const categoryService = new category_service_1.CategoryService(new category_repository_1.CategoryRepository());
class CategoryController {
    static async create(req, res) {
        try {
            const category = await categoryService.createCategory(req.body, req.user.id);
            res.status(201).json({
                success: true,
                data: category,
            });
        }
        catch (error) {
            res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    }
    static async update(req, res) {
        try {
            const category = await categoryService.updateCategory(req.params.id, req.body);
            if (!category) {
                return res.status(404).json({
                    success: false,
                    message: "Category not found",
                });
            }
            res.status(200).json({
                success: true,
                data: category,
            });
        }
        catch (error) {
            res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    }
    static async getAll(req, res) {
        try {
            const categories = await categoryService.getAllCategories();
            res.status(200).json({
                success: true,
                data: categories,
            });
        }
        catch (error) {
            res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    }
    static async delete(req, res) {
        try {
            await categoryService.deleteCategory(req.params.id);
            res.status(200).json({
                success: true,
                message: "Category deleted successfully",
            });
        }
        catch (error) {
            res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    }
}
exports.CategoryController = CategoryController;
//# sourceMappingURL=category.controller.js.map