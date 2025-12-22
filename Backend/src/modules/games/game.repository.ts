import Game from "./game.model";

export const createGame = (data: any) => {
  return Game.create(data);
};

export const findByNameAndCategory = (
  name: string,
  category: string
) => {
  return Game.findOne({ name, category });
};

export const findAllActive = () => {
  return Game.find({
    isActive: true,
    status: "active",
  }).populate("category", "name image");
};

export const findByCategory = (categoryId: string) => {
  return Game.find({
    category: categoryId,
    isActive: true,
    status: "active",
  }).populate("category", "name image");
};

export const findById = (id: string) => {
  return Game.findById(id).populate("category", "name image");
};

export const updateById = (id: string, data: any) => {
  return Game.findByIdAndUpdate(id, data, { new: true });
};

export const deleteById = (id: string) => {
  return Game.findByIdAndDelete(id);
};
