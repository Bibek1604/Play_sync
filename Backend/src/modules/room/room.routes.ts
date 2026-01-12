
import { Router } from "express";
import { auth } from "../auth/auth.middleware";
import { create, join, accept } from "./room.controller";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Rooms
 *   description: Room management endpoints
 */

/**
 * @swagger
 * /rooms:
 *   post:
 *     summary: Create a new room
 *     tags: [Rooms]
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
 *               gameId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Room created
 */
router.post("/", auth, create);

/**
 * @swagger
 * /rooms/{roomId}/join:
 *   post:
 *     summary: Request to join a room
 *     tags: [Rooms]
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
 *         description: Join request sent
 */
router.post("/:roomId/join", auth, join);

/**
 * @swagger
 * /rooms/accept/{invitationId}:
 *   post:
 *     summary: Accept a room invitation
 *     tags: [Rooms]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: invitationId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Invitation accepted
 */
router.post("/accept/:invitationId", auth, accept);

export default router;
