import { Request, Response } from "express";
import { createGame, getGamesByCategory } from "./game.service";

export const create = async (req: Request, res: Response) => {
  try {
    const game = await createGame(req.body);
    res.status(201).json(game);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getByCategory = async (req: Request, res: Response) => {
  const games = await getGamesByCategory(req.params.categoryId);
  res.json(games);
};
