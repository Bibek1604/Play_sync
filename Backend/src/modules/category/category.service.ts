
import Category from "./category.model";

export const createCategory = async (name: "online" | "offline") => {
  return await Category.create({ name });
};

export const getAllCategories = async () => {
  return await Category.find();
};
