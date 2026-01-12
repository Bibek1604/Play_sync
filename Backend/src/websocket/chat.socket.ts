import { Server, Socket } from "socket.io";
import { saveMessage } from "../modules/chat/chat.service";
import { GameModel } from "../modules/games/game.model";

export const chatSocket = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    socket.on("join-room", (gameId: string) => {
      socket.join(gameId);
    });

    socket.on(
      "send-message",
      async ({ gameId, message }: { gameId: string; message: string }) => {
        const userId = socket.data.user.id;

        // Check if user is in the game
        const game = await GameModel.findOne({ gameId });
        if (!game || !game.players.includes(userId)) {
          socket.emit("error", { message: "You are not part of this game" });
          return;
        }

        const savedMessage = await saveMessage(gameId, userId, message);

        io.to(gameId).emit("new-message", {
          gameId,
          message: savedMessage.message,
          sender: socket.data.user,
          createdAt: savedMessage.get("createdAt")
        });
      }
    );

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
};
