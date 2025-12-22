
import { Router } from "express";
import { authenticate } from "../auth/auth.middleware";
import { create, getByCategory, getAll, getById, update, remove } from "./game.controller";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Games
 *   description: Game management endpoints
 */

/**
 * @swagger
 * /games:
 *   post:
 *     summary: Create a new game
 *     tags: [Games]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               category:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Game created
 *       400:
 *         description: Bad request
 */
router.post("/", authenticate, create);

/**
 * @swagger
 * /games:
 *   get:
 *     summary: Get all games
 *     tags: [Games]
 *     responses:
 *       200:
 *         description: List of games
 */
router.get("/", getAll);

/**
 * @swagger
 * /games/{id}:
 *   get:
 *     summary: Get game by ID
 *     tags: [Games]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Game found
 *       404:
 *         description: Game not found
 */
router.get("/:id", getById);

/**
 * @swagger
 * /games/{id}:
 *   put:
 *     summary: Update game by ID
 *     tags: [Games]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               category:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Game updated
 *       404:
 *         description: Game not found
 */
router.put("/:id", authenticate, update);

/**
 * @swagger
 * /games/{id}:
 *   delete:
 *     summary: Delete game by ID
 *     tags: [Games]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Game deleted
 *       404:
 *         description: Game not found
 */
router.delete("/:id", authenticate, remove);

/**
 * @swagger
 * /games/category/{categoryId}:
 *   get:
 *     summary: Get games by category
 *     tags: [Games]
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of games
 */
router.get("/category/:categoryId", getByCategory);

export default router;
