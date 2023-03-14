import { z } from 'zod';

export const gamesCreateSchema = z
  .object({
    name: z.string(),
  })
  .strict();
