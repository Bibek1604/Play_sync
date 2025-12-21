import Chat from "./chat.model";

export const saveMessage = async (
  roomId: string,
  senderId: string,
  message: string
) => {
  return await Chat.create({
    room: roomId,
    sender: senderId,
    message
  });
};

export const getMessagesByRoom = async (roomId: string) => {
  return await Chat.find({ room: roomId })
    .populate("sender", "username")
    .sort({ createdAt: 1 });
};
