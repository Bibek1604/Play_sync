import { Request, Response } from "express";
import { createCategory, getAllCategories, getCategoryById, updateCategory, removeCategory } from "./category.service";

export const create = async (req: Request, res: Response) => {
  try {
    const category = await createCategory(req.body.name);
    res.status(201).json(category);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

  const categories = await getAllCategories();
  res.json(categories);
};

export const getById = async (req: Request, res: Response) => {
  try {
    const category = await getCategoryById(req.params.id);
    if (!category) return res.status(404).json({ message: "Category not found" });
    res.json(category);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const category = await updateCategory(req.params.id, req.body.name);
    if (!category) return res.status(404).json({ message: "Category not found" });
    res.json(category);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const category = await removeCategory(req.params.id);
    if (!category) return res.status(404).json({ message: "Category not found" });
    res.json({ message: "Category deleted" });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
