import Leaderboard from "./leaderboard.model";

export const updateScore = async (
  roomId: string,
  userId: string,
  score: number
) => {
  return await Leaderboard.findOneAndUpdate(
    { room: roomId, user: userId },
    { score },
    { upsert: true, new: true }
  );
};

export const getLeaderboardByRoom = async (roomId: string) => {
  return await Leaderboard.find({ room: roomId })
    .populate("user", "username")
    .sort({ score: -1 });
};
