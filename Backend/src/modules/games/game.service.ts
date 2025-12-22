import Game from "./game.model";

export const createGame = async (data: {
  name: string;
  category: string;
  description?: string;
}) => {
  return await Game.create(data);
};

export const getGamesByCategory = async (categoryId: string) => {
  return await Game.find({ category: categoryId }).populate("category");
};

export const getAllGames = async () => {
  return await Game.find().populate("category");
};

export const getGameById = async (id: string) => {
  return await Game.findById(id).populate("category");
};

export const updateGame = async (id: string, data: { name?: string; category?: string; description?: string }) => {
  return await Game.findByIdAndUpdate(id, data, { new: true }).populate("category");
};

export const removeGame = async (id: string) => {
  return await Game.findByIdAndDelete(id);
};
