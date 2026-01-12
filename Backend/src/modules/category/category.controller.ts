import { Request, Response } from "express";
import { CategoryService } from "./category.service";
import { CategoryRepository } from "./category.repository";

const categoryService = new CategoryService(
  new CategoryRepository()
);

export class CategoryController {
  static async create(req: Request, res: Response) {
    try {
      const category = await categoryService.createCategory(
        req.body,
        req.user!.id // from auth middleware
      );

      res.status(201).json({
        success: true,
        data: category,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const category = await categoryService.updateCategory(
        req.params.id,
        req.body
      );

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
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  static async getAll(req: Request, res: Response) {
    try {
      const categories = await categoryService.getAllCategories();
      res.status(200).json({
        success: true,
        data: categories,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      await categoryService.deleteCategory(req.params.id);
      res.status(200).json({
        success: true,
        message: "Category deleted successfully",
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
}
