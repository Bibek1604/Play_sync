import { Router } from "express";
import { authenticate } from "../auth/auth.middleware";
import { create, join, accept } from "./room.controller";

const router = Router();

router.post("/", authenticate, create);
router.post("/:roomId/join", authenticate, join);
router.post("/accept/:invitationId", authenticate, accept);

export default router;
