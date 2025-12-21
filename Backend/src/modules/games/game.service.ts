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
