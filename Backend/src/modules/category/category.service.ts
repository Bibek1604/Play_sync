import * as CategoryRepo from "./category.repository";
import { AppError } from "../../utils/appError";

export const createCategory = async (
  name: string,
  image: string
) => {
  const exists = await CategoryRepo.findByName(name);
  if (exists) {
    throw new AppError("Category already exists", 409);
  }

  return CategoryRepo.createCategory({ name, image });
};

export const getAllCategories = async () => {
  return CategoryRepo.findAll();
};

export const getCategoryById = async (id: string) => {
  const category = await CategoryRepo.findById(id);
  if (!category) {
    throw new AppError("Category not found", 404);
  }
  return category;
};

export const updateCategory = async (
  id: string,
  name: string,
  image: string
) => {
  const updated = await CategoryRepo.updateById(id, { name, image });
  if (!updated) {
    throw new AppError("Category not found", 404);
  }
  return updated;
};

export const removeCategory = async (id: string) => {
  const deleted = await CategoryRepo.deleteById(id);
  if (!deleted) {
    throw new AppError("Category not found", 404);
  }
};
