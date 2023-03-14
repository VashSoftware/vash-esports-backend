import { ZodError } from 'zod';

export const formatZodErrors = (error: ZodError) =>
  error.issues.map((issue) => issue.message);
