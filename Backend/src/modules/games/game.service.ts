import { GameRepository } from "./game.repository";
import { CreateGameDTO } from "./game.dto";
import { v4 as uuidv4 } from "uuid";
import { LeaderboardService } from "../leaderboard/leaderboard.service";

export class GameService {
  constructor(private gameRepo: GameRepository) {}

  async createGame(dto: CreateGameDTO, userId: string) {
    if (dto.pricingType === "paid" && (!dto.price || dto.price <= 0)) {
      throw new Error("Paid games must have a valid price");
    }

    // Check if user already has an active created game (not ended)
    const existingGame = await this.gameRepo.findActiveGameByCreator(userId);
    if (existingGame) {
      throw new Error("You already have an active game. Please end or delete your current game before creating a new one.");
    }

    const gameId = `GAME-${uuidv4().slice(0, 8)}`;

    // Create game with creator automatically joined
    const game = await this.gameRepo.create({ 
      ...dto, 
      gameId, 
      createdBy: userId
    });

    // Add creator as first player
    game.players.push(new (require('mongoose').Types.ObjectId)(userId));
    game.joinedPlayers = 1;
    await this.gameRepo.save(game);

    // Update leaderboard - both creation and join activity
    await LeaderboardService.recordGameCreation(userId);
    await LeaderboardService.recordGameJoin(userId);

    return game;
  }

  async getGamesByCategory(categoryId: string) {
    return this.gameRepo.findByCategory(categoryId);
  }

  async getAllGames() {
    return this.gameRepo.findAll();
  }

  async getGameById(gameId: string) {
    const game = await this.gameRepo.findById(gameId);
    if (!game) {
      throw new Error("Game not found");
    }
    return game;
  }

  async updateGame(gameId: string, dto: any) {
    const game = await this.gameRepo.findById(gameId);
    if (!game) {
      throw new Error("Game not found");
    }
    return this.gameRepo.updateById(gameId, dto);
  }

  async deleteGame(gameId: string) {
    const game = await this.gameRepo.findById(gameId);
    if (!game) {
      throw new Error("Game not found");
    }
    return this.gameRepo.deleteById(gameId);
  }

  async getGamesCreatedByUser(userId: string) {
    return this.gameRepo.findByCreator(userId);
  }

  async getGamesJoinedByUser(userId: string) {
    return this.gameRepo.findByPlayer(userId);
  }
}
