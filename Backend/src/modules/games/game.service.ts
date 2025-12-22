import * as GameRepo from "./game.repository";
import Category from "../category/category.model";
import { AppError } from "../../utils/appError";
import slugify from "slugify";

export const createGame = async (data: any) => {
  const categoryExists = await Category.findById(data.category);
  if (!categoryExists) {
    throw new AppError("Category not found", 404);
  }

  const exists = await GameRepo.findByNameAndCategory(
    data.name,
    data.category
  );
  if (exists) {
    throw new AppError("Game already exists in this category", 409);
  }

  const slug = slugify(data.name, { lower: true });

  return GameRepo.createGame({
    ...data,
    slug,
    status: "draft",     
    isActive: false,    
  });
};

export const getAllGames = async () => {
  return GameRepo.findAllActive();
};

export const getGamesByCategory = async (categoryId: string) => {
  return GameRepo.findByCategory(categoryId);
};

export const getGameById = async (id: string) => {
  const game = await GameRepo.findById(id);
  if (!game) {
    throw new AppError("Game not found", 404);
  }
  return game;
};

export const updateGame = async (id: string, data: any) => {
  const updated = await GameRepo.updateById(id, data);
  if (!updated) {
    throw new AppError("Game not found", 404);
  }
  return updated;
};

export const deleteGame = async (id: string) => {
  const deleted = await GameRepo.deleteById(id);
  if (!deleted) {
    throw new AppError("Game not found", 404);
  }
};
