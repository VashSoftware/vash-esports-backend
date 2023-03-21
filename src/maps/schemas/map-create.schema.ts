import { z } from 'zod';

const beatmapLengthRegex = /^([0-1]?\d|2[0-3])(?::([0-5]?\d))?$/;

export const mapCreateSchema = z
  .object({
    osuBeatmapId: z.number().int(),
    cs: z.number().max(11),
    ar: z.number().max(11),
    od: z.number().max(11),
    hp: z.number().max(11),
    bpm: z.number(),
    length: z.string().regex(beatmapLengthRegex),
    artist: z.string(),
    cover: z.string().nullish(),
    title: z.string(),
    mapper: z.string(),
  })
  .strict();
