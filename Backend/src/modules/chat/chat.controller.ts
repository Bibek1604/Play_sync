import { Request, Response } from "express";
import { getMessagesByRoom } from "./chat.service";

export const getRoomMessages = async (req: Request, res: Response) => {
  const messages = await getMessagesByRoom(req.params.roomId);
  res.json(messages);
};
