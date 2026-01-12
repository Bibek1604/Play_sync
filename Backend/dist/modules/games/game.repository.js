"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameRepository = void 0;
const game_model_1 = require("./game.model");
class GameRepository {
    async create(data) {
        return game_model_1.GameModel.create(data);
    }
    async findByCategory(categoryId) {
        return game_model_1.GameModel.find({ categoryId })
            .populate("categoryId", "name image")
            .sort({ createdAt: -1 });
    }
    async findById(gameId) {
        return game_model_1.GameModel.findOne({ gameId });
    }
    async findAll() {
        return game_model_1.GameModel.find()
            .populate("categoryId", "name image")
            .sort({ createdAt: -1 });
    }
    async updateById(gameId, data) {
        return game_model_1.GameModel.findOneAndUpdate({ gameId }, data, { new: true });
    }
    async deleteById(gameId) {
        return game_model_1.GameModel.findOneAndDelete({ gameId });
    }
    async save(game) {
        return game.save();
    }
    async findByCreator(userId) {
        return game_model_1.GameModel.find({ createdBy: userId })
            .populate("categoryId", "name image")
            .sort({ createdAt: -1 });
    }
    async findByPlayer(userId) {
        return game_model_1.GameModel.find({ players: userId })
            .populate("categoryId", "name image")
            .sort({ createdAt: -1 });
    }
    async findActiveGameByCreator(userId) {
        return game_model_1.GameModel.findOne({
            createdBy: userId,
            status: { $in: ["open", "full", "started"] }
        });
    }
}
exports.GameRepository = GameRepository;
//# sourceMappingURL=game.repository.js.map