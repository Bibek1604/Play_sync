import Room from "./room.model";
import RoomInvitation from "./roomInvitation.model";
import { Types } from "mongoose";

export const createRoom = async (
  name: string,
  gameId: string,
  creatorId: string
) => {
  return await Room.create({
    name,
    game: new Types.ObjectId(gameId),
    creator: new Types.ObjectId(creatorId),
    members: [new Types.ObjectId(creatorId)]
  });
};

export const requestToJoin = async (roomId: string, userId: string) => {
  return await RoomInvitation.create({ room: roomId, user: userId });
};

export const acceptRequest = async (invitationId: string) => {
  const invitation = await RoomInvitation.findById(invitationId);
  if (!invitation) throw new Error("Invitation not found");

  invitation.status = "accepted";
  await invitation.save();

  await Room.findByIdAndUpdate(invitation.room, {
    $addToSet: { members: invitation.user }
  });

  return invitation;
};
