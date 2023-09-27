import { z } from 'zod';
import { errorUtil } from 'zod/lib/helpers/errorUtil';
import ErrMessage = errorUtil.ErrMessage;
import { isNil } from '@nestjs/common/utils/shared.utils';
import { EventTypeEnum } from '@vash-backend/util/enums/event-type.enum';

const ISODateRegex =
  /^\d{4}(-\d\d(-\d\d(T\d\d:\d\d(:\d\d)?(\.\d+)?(([+-]\d\d:\d\d)|Z)?)?)?)?$/i;

const EventNameLengthError: ErrMessage =
  'Name must be between 1 and 40 characters';

const EventNameIsRequiredError: ErrMessage = 'Name is required';

const EventDateLessThanNowError: ErrMessage =
  'Start time must be later than now';

const TeamSizeError: ErrMessage = 'Team size must be between 1 and 8';

const PlayingTeamSizeError: ErrMessage = `Playing ${TeamSizeError.toLowerCase()}`;

const RankLimitError: ErrMessage = 'Rank limit must be above 0';

export const eventsCreateSchema = z
  .object({
    name: z
      .string()
      .min(1, EventNameLengthError)
      .max(40, EventNameLengthError)
      .nonempty(EventNameIsRequiredError),
    eventType: z.nativeEnum(EventTypeEnum),
    gameId: z.number(),
    organisationId: z.number(),
  })
  .strict();

export type EventsCreateDto = z.infer<typeof eventsCreateSchema>;
