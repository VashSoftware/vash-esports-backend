export class EventCreateDto {
  name: string;
  startTime: Date;
  teamSize: number;
  playingTeamSize: number;
  qualifierType: string;
  bracketType: string;
  lowerRankLimit: number;
  upperRankLimit: number;
  gameId: number;
  organisationId: number;
  challongeId: string;
}
