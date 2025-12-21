import { Request, Response } from "express";
import { updateScore, getLeaderboardByRoom } from "./leaderboard.service";

export const update = async (req: any, res: Response) => {
  try {
    const { roomId, score } = req.body;
    const userId = req.user.id; 

    const result = await updateScore(roomId, userId, score);
    res.json(result);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getByRoom = async (req: Request, res: Response) => {
  try {
    const leaderboard = await getLeaderboardByRoom(req.params.roomId);
    res.json(leaderboard);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
