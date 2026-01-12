import { body, param, query, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

/**
 * Middleware to handle validation errors
 */
export const handleValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }
  next();
};

/**
 * Auth validation rules
 */
export const registerValidation = [
  body("fullName")
    .trim()
    .notEmpty()
    .withMessage("Full name is required")
    .isLength({ min: 2 })
    .withMessage("Full name must be at least 2 characters"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Must be a valid email"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  handleValidationErrors,
];

export const loginValidation = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Must be a valid email"),
  body("password").notEmpty().withMessage("Password is required"),
  handleValidationErrors,
];

/**
 * Category validation rules
 */
export const createCategoryValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Category name is required")
    .isLength({ min: 2 })
    .withMessage("Category name must be at least 2 characters"),
  body("type")
    .notEmpty()
    .withMessage("Category type is required")
    .isIn(["online", "offline"])
    .withMessage("Type must be either online or offline"),
  body("image").trim().notEmpty().withMessage("Image URL is required"),
  body("description")
    .optional()
    .isLength({ max: 300 })
    .withMessage("Description must not exceed 300 characters"),
  handleValidationErrors,
];

export const updateCategoryValidation = [
  body("name")
    .optional()
    .trim()
    .isLength({ min: 2 })
    .withMessage("Category name must be at least 2 characters"),
  body("image").optional().trim().notEmpty().withMessage("Image URL cannot be empty"),
  body("description")
    .optional()
    .isLength({ max: 300 })
    .withMessage("Description must not exceed 300 characters"),
  body("isActive").optional().isBoolean().withMessage("isActive must be boolean"),
  handleValidationErrors,
];

/**
 * Game validation rules
 */
export const createGameValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Game name is required")
    .isLength({ min: 2 })
    .withMessage("Game name must be at least 2 characters"),
  body("image").trim().notEmpty().withMessage("Image URL is required"),
  body("categoryId")
    .notEmpty()
    .withMessage("Category ID is required")
    .isMongoId()
    .withMessage("Invalid category ID"),
  body("gameType")
    .notEmpty()
    .withMessage("Game type is required")
    .isIn(["online", "offline"])
    .withMessage("Game type must be online or offline"),
  body("gameMode")
    .notEmpty()
    .withMessage("Game mode is required")
    .isIn(["solo", "1v1", "multiplayer", "tournament"])
    .withMessage("Invalid game mode"),
  body("requiredPlayers")
    .notEmpty()
    .withMessage("Required players is required")
    .isInt({ min: 1 })
    .withMessage("Required players must be at least 1"),
  body("pricingType")
    .notEmpty()
    .withMessage("Pricing type is required")
    .isIn(["free", "paid"])
    .withMessage("Pricing type must be free or paid"),
  body("price")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive number"),
  body("location").optional().trim(),
  handleValidationErrors,
];

export const updateGameValidation = [
  body("name")
    .optional()
    .trim()
    .isLength({ min: 2 })
    .withMessage("Game name must be at least 2 characters"),
  body("image").optional().trim().notEmpty().withMessage("Image URL cannot be empty"),
  body("location").optional().trim(),
  body("status")
    .optional()
    .isIn(["open", "full", "started", "ended"])
    .withMessage("Invalid status"),
  handleValidationErrors,
];

/**
 * Chat validation rules
 */
export const sendMessageValidation = [
  param("gameId").notEmpty().withMessage("Game ID is required"),
  body("message")
    .trim()
    .notEmpty()
    .withMessage("Message is required")
    .isLength({ max: 500 })
    .withMessage("Message must not exceed 500 characters"),
  handleValidationErrors,
];

/**
 * Leaderboard validation rules
 */
export const updateStatsValidation = [
  body("userId")
    .notEmpty()
    .withMessage("User ID is required")
    .isMongoId()
    .withMessage("Invalid user ID"),
  body("didWin").notEmpty().withMessage("didWin is required").isBoolean(),
  body("scoreChange").optional().isInt().withMessage("Score change must be an integer"),
  handleValidationErrors,
];

/**
 * Common validation rules
 */
export const mongoIdValidation = (paramName: string = "id") => [
  param(paramName).isMongoId().withMessage(`Invalid ${paramName}`),
  handleValidationErrors,
];
