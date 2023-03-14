import { z } from 'zod';
import { errorUtil } from 'zod/lib/helpers/errorUtil';
import ErrMessage = errorUtil.ErrMessage;
import { TimezonesEnum } from '@vash-backend/util/enums/timezones.enum';

const noSpecialSymbolsRegexp = /^[_A-z0-9]*((-|\s)*[_A-z0-9])*$/;

const PasswordLengthError: ErrMessage =
  'Password must be between 8 and 20 characters';
const InvalidSymbolsError: ErrMessage =
  'Username/password must not contain special symbols';
export const userCreateSchema = z
  .object({
    username: z
      .string()
      .regex(noSpecialSymbolsRegexp, InvalidSymbolsError)
      .max(15, 'Username must be less than 15 characters!'),
    password: z
      .string()
      .regex(noSpecialSymbolsRegexp, InvalidSymbolsError)
      .min(8, PasswordLengthError)
      .max(20, PasswordLengthError),
    timezone: z.nativeEnum(TimezonesEnum),
  })
  .strict();
