import { Request, Response, NextFunction } from "express";
import * as CategoryService from "./category.service";
import { successResponse } from "../../utils/responseFormatter";

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const category = await CategoryService.createCategory(
      req.body.name,
      req.body.image
    );
    successResponse(res, category, "Category created", 201);
  } catch (err) {
    next(err);
  }
};

export const getAll = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categories = await CategoryService.getAllCategories();
    successResponse(res, categories);
  } catch (err) {
    next(err);
  }
};

export const getById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const category = await CategoryService.getCategoryById(req.params.id);
    successResponse(res, category);
  } catch (err) {
    next(err);
  }
};

export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const category = await CategoryService.updateCategory(
      req.params.id,
      req.body.name,
      req.body.image
    );
    successResponse(res, category, "Category updated");
  } catch (err) {
    next(err);
  }
};

export const remove = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await CategoryService.removeCategory(req.params.id);
    successResponse(res, null, "Category deleted");
  } catch (err) {
    next(err);
  }
};
