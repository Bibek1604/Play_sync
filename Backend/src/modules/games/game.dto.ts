import { z } from "zod";

export const CreateGameDTO = z.object({
  name: z.string().min(3),
  image: z.string().url(),
  category: z.string(),
  playType: z.enum(["online", "offline"]),
  description: z.string().max(500).optional(),
  order: z.number().optional(),
});

export type CreateGameDto = z.infer<typeof CreateGameDTO>;
