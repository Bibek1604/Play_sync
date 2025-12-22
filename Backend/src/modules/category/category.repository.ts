import Category from "./category.model";

export const findByName = (name: string) => {
  return Category.findOne({ name });
};

export const createCategory = (data: {
  name: string;
  image: string;
}) => {
  return Category.create(data);
};

export const findAll = () => {
  return Category.find({ isActive: true });
};

export const findById = (id: string) => {
  return Category.findById(id);
};

export const updateById = (
  id: string,
  data: { name: string; image: string }
) => {
  return Category.findByIdAndUpdate(id, data, { new: true });
};

export const deleteById = (id: string) => {
  return Category.findByIdAndDelete(id);
};
