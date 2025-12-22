import { z } from "zod";

export const CreateCategoryDTO = z.object({
  name: z.string().min(3),
  image: z.string().url("Image must be a valid URL"),
});

export type CreateCategoryDto = z.infer<typeof CreateCategoryDTO>;
