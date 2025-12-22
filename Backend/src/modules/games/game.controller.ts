import { Request, Response } from "express";

import {
  createGame,
  getGamesByCategory,
  getAllGames,
  getGameById,
  updateGame,
  deleteGame as removeGame,
} from "./game.service";


export const create = async (req: Request, res: Response) => {
  try {
    const game = await createGame(req.body);
    res.status(201).json(game);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getByCategory = async (req: Request, res: Response) => {
  try {
    const games = await getGamesByCategory(req.params.categoryId);
    res.json(games);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getAll = async (_req: Request, res: Response) => {
  const games = await getAllGames();
  res.json(games);
};

export const getById = async (req: Request, res: Response) => {
  try {
    const game = await getGameById(req.params.id);
    if (!game) return res.status(404).json({ message: "Game not found" });
    res.json(game);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const game = await updateGame(req.params.id, req.body);
    if (!game) return res.status(404).json({ message: "Game not found" });
    res.json(game);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const deleted = await removeGame(req.params.id);
    res.json({ message: "Game deleted" });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
