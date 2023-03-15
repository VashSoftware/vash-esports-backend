import { z } from 'zod';
import { errorUtil } from 'zod/lib/helpers/errorUtil';
import ErrMessage = errorUtil.ErrMessage;
import { TimezonesEnum } from '@vash-backend/util/enums/timezones.enum';

const noSpecialSymbolsRegexp = /^[_A-z0-9]*((-|\s)*[_A-z0-9])*$/;

const InvalidSymbolsError: ErrMessage =
  'Username/password must not contain special symbols';
export const userCreateSchema = z
  .object({
    username: z
      .string()
      .regex(noSpecialSymbolsRegexp, InvalidSymbolsError)
      .max(15, 'Username must be less than 15 characters!'),
    timezone: z.nativeEnum(TimezonesEnum),
    firebaseId: z.string(),
  })
  .strict();
