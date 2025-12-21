import { Request, Response } from "express";
import { createRoom, requestToJoin, acceptRequest } from "./room.service";

export const create = async (req: any, res: Response) => {
  const room = await createRoom(
    req.body.name,
    req.body.gameId,
    req.user.id
  );
  res.status(201).json(room);
};

export const join = async (req: any, res: Response) => {
  const request = await requestToJoin(req.params.roomId, req.user.id);
  res.json(request);
};

export const accept = async (req: Request, res: Response) => {
  const result = await acceptRequest(req.params.invitationId);
  res.json(result);
};
