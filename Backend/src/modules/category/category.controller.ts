import { Request, Response } from "express";
import { createCategory, getAllCategories } from "./category.service";

export const create = async (req: Request, res: Response) => {
  try {
    const category = await createCategory(req.body.name);
    res.status(201).json(category);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getAll = async (_req: Request, res: Response) => {
  const categories = await getAllCategories();
  res.json(categories);
};
