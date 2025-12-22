
import Category from "./category.model";

export const createCategory = async (name: "online" | "offline") => {
  return await Category.create({ name });
};

  return await Category.find();
};

export const getCategoryById = async (id: string) => {
  return await Category.findById(id);
};

export const updateCategory = async (id: string, name: "online" | "offline") => {
  return await Category.findByIdAndUpdate(id, { name }, { new: true });
};

export const removeCategory = async (id: string) => {
  return await Category.findByIdAndDelete(id);
};
