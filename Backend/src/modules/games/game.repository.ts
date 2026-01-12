import { GameModel, IGame } from "./game.model";
import { CreateGameDTO } from "./game.dto";

export class GameRepository {
  async create(data: CreateGameDTO & { gameId: string; createdBy: string }): Promise<IGame> {
    return GameModel.create(data);
  }

  async findByCategory(categoryId: string): Promise<IGame[]> {
    return GameModel.find({ categoryId })
      .populate("categoryId", "name image")
      .sort({ createdAt: -1 });
  }

  async findById(gameId: string): Promise<IGame | null> {
    return GameModel.findOne({ gameId });
  }

  async findAll(): Promise<IGame[]> {
    return GameModel.find()
      .populate("categoryId", "name image")
      .sort({ createdAt: -1 });
  }

  async updateById(gameId: string, data: any): Promise<IGame | null> {
    return GameModel.findOneAndUpdate({ gameId }, data, { new: true });
  }

  async deleteById(gameId: string): Promise<IGame | null> {
    return GameModel.findOneAndDelete({ gameId });
  }

  async save(game: IGame): Promise<IGame> {
    return game.save();
  }

  async findByCreator(userId: string): Promise<IGame[]> {
    return GameModel.find({ createdBy: userId })
      .populate("categoryId", "name image")
      .sort({ createdAt: -1 });
  }

  async findByPlayer(userId: string): Promise<IGame[]> {
    return GameModel.find({ players: userId })
      .populate("categoryId", "name image")
      .sort({ createdAt: -1 });
  }

  async findActiveGameByCreator(userId: string): Promise<IGame | null> {
    return GameModel.findOne({ 
      createdBy: userId, 
      status: { $in: ["open", "full", "started"] } 
    });
  }
}
