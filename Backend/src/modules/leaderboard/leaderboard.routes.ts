
import { Router } from "express";
import { authenticate } from "../auth/auth.middleware";
import { update, getByRoom } from "./leaderboard.controller";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Leaderboard
 *   description: Leaderboard endpoints
 */

/**
 * @swagger
 * /leaderboard/update:
 *   post:
 *     summary: Update leaderboard score
 *     tags: [Leaderboard]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               roomId:
 *                 type: string
 *               score:
 *                 type: number
 *     responses:
 *       200:
 *         description: Score updated
 *       400:
 *         description: Bad request
 */
router.post("/update", authenticate, update);

/**
 * @swagger
 * /leaderboard/room/{roomId}:
 *   get:
 *     summary: Get leaderboard by room
 *     tags: [Leaderboard]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: roomId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Leaderboard data
 *       400:
 *         description: Bad request
 */
router.get("/room/:roomId", authenticate, getByRoom);

export default router;
