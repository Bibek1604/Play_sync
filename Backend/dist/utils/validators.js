"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoIdValidation = exports.updateStatsValidation = exports.sendMessageValidation = exports.updateGameValidation = exports.createGameValidation = exports.updateCategoryValidation = exports.createCategoryValidation = exports.loginValidation = exports.registerValidation = exports.handleValidationErrors = void 0;
const express_validator_1 = require("express-validator");
const handleValidationErrors = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array(),
        });
    }
    next();
};
exports.handleValidationErrors = handleValidationErrors;
exports.registerValidation = [
    (0, express_validator_1.body)("fullName")
        .trim()
        .notEmpty()
        .withMessage("Full name is required")
        .isLength({ min: 2 })
        .withMessage("Full name must be at least 2 characters"),
    (0, express_validator_1.body)("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Must be a valid email"),
    (0, express_validator_1.body)("password")
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters"),
    exports.handleValidationErrors,
];
exports.loginValidation = [
    (0, express_validator_1.body)("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Must be a valid email"),
    (0, express_validator_1.body)("password").notEmpty().withMessage("Password is required"),
    exports.handleValidationErrors,
];
exports.createCategoryValidation = [
    (0, express_validator_1.body)("name")
        .trim()
        .notEmpty()
        .withMessage("Category name is required")
        .isLength({ min: 2 })
        .withMessage("Category name must be at least 2 characters"),
    (0, express_validator_1.body)("type")
        .notEmpty()
        .withMessage("Category type is required")
        .isIn(["online", "offline"])
        .withMessage("Type must be either online or offline"),
    (0, express_validator_1.body)("image").trim().notEmpty().withMessage("Image URL is required"),
    (0, express_validator_1.body)("description")
        .optional()
        .isLength({ max: 300 })
        .withMessage("Description must not exceed 300 characters"),
    exports.handleValidationErrors,
];
exports.updateCategoryValidation = [
    (0, express_validator_1.body)("name")
        .optional()
        .trim()
        .isLength({ min: 2 })
        .withMessage("Category name must be at least 2 characters"),
    (0, express_validator_1.body)("image").optional().trim().notEmpty().withMessage("Image URL cannot be empty"),
    (0, express_validator_1.body)("description")
        .optional()
        .isLength({ max: 300 })
        .withMessage("Description must not exceed 300 characters"),
    (0, express_validator_1.body)("isActive").optional().isBoolean().withMessage("isActive must be boolean"),
    exports.handleValidationErrors,
];
exports.createGameValidation = [
    (0, express_validator_1.body)("name")
        .trim()
        .notEmpty()
        .withMessage("Game name is required")
        .isLength({ min: 2 })
        .withMessage("Game name must be at least 2 characters"),
    (0, express_validator_1.body)("image").trim().notEmpty().withMessage("Image URL is required"),
    (0, express_validator_1.body)("categoryId")
        .notEmpty()
        .withMessage("Category ID is required")
        .isMongoId()
        .withMessage("Invalid category ID"),
    (0, express_validator_1.body)("gameType")
        .notEmpty()
        .withMessage("Game type is required")
        .isIn(["online", "offline"])
        .withMessage("Game type must be online or offline"),
    (0, express_validator_1.body)("gameMode")
        .notEmpty()
        .withMessage("Game mode is required")
        .isIn(["solo", "1v1", "multiplayer", "tournament"])
        .withMessage("Invalid game mode"),
    (0, express_validator_1.body)("requiredPlayers")
        .notEmpty()
        .withMessage("Required players is required")
        .isInt({ min: 1 })
        .withMessage("Required players must be at least 1"),
    (0, express_validator_1.body)("pricingType")
        .notEmpty()
        .withMessage("Pricing type is required")
        .isIn(["free", "paid"])
        .withMessage("Pricing type must be free or paid"),
    (0, express_validator_1.body)("price")
        .optional()
        .isFloat({ min: 0 })
        .withMessage("Price must be a positive number"),
    (0, express_validator_1.body)("location").optional().trim(),
    exports.handleValidationErrors,
];
exports.updateGameValidation = [
    (0, express_validator_1.body)("name")
        .optional()
        .trim()
        .isLength({ min: 2 })
        .withMessage("Game name must be at least 2 characters"),
    (0, express_validator_1.body)("image").optional().trim().notEmpty().withMessage("Image URL cannot be empty"),
    (0, express_validator_1.body)("location").optional().trim(),
    (0, express_validator_1.body)("status")
        .optional()
        .isIn(["open", "full", "started", "ended"])
        .withMessage("Invalid status"),
    exports.handleValidationErrors,
];
exports.sendMessageValidation = [
    (0, express_validator_1.param)("gameId").notEmpty().withMessage("Game ID is required"),
    (0, express_validator_1.body)("message")
        .trim()
        .notEmpty()
        .withMessage("Message is required")
        .isLength({ max: 500 })
        .withMessage("Message must not exceed 500 characters"),
    exports.handleValidationErrors,
];
exports.updateStatsValidation = [
    (0, express_validator_1.body)("userId")
        .notEmpty()
        .withMessage("User ID is required")
        .isMongoId()
        .withMessage("Invalid user ID"),
    (0, express_validator_1.body)("didWin").notEmpty().withMessage("didWin is required").isBoolean(),
    (0, express_validator_1.body)("scoreChange").optional().isInt().withMessage("Score change must be an integer"),
    exports.handleValidationErrors,
];
const mongoIdValidation = (paramName = "id") => [
    (0, express_validator_1.param)(paramName).isMongoId().withMessage(`Invalid ${paramName}`),
    exports.handleValidationErrors,
];
exports.mongoIdValidation = mongoIdValidation;
//# sourceMappingURL=validators.js.map