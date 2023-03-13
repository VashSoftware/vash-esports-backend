import { z } from 'zod';
import { errorUtil } from 'zod/lib/helpers/errorUtil';
import ErrMessage = errorUtil.ErrMessage;
import { QualifierType } from '../enums/qualifier-type.enum';
import { BracketTypeEnum } from '../enums/bracket-type.enum';
import { isNil } from '@nestjs/common/utils/shared.utils';

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
    startTime: z.date().min(new Date(), EventDateLessThanNowError),
    teamSize: z
      .number()
      .int()
      .min(1, TeamSizeError)
      .max(8, TeamSizeError),
    playingTeamSize: z
      .number()
      .int()
      .min(1, PlayingTeamSizeError)
      .max(8, PlayingTeamSizeError),
    qualifierType: z.nativeEnum(QualifierType),
    bracketType: z.nativeEnum(BracketTypeEnum),
    lowerRankLimit: z.number().int().min(1, RankLimitError).nullish(),
    upperRankLimit: z.number().int().min(1, RankLimitError).nullish(),
    osuForumThreadId: z.number().int().nullish(),
    isStarted: z.boolean().nullish(),
    isFinished: z.boolean().nullish(),
  })
  .strict()
  .refine((event) => {
    if (
      !isNil(event.lowerRankLimit) &&
      !isNil(event.upperRankLimit)
    ) {
      return event.upperRankLimit < event.lowerRankLimit;
    }
  }, 'Upper limit must be less than lower limit');
