import { PrismaClient } from '@prisma/client';
import { ScoreRanksEnum } from '../enums/score-ranks.enum';

const prisma = new PrismaClient();
const main = async () => {
  const kirby = await prisma.user.create({
    data: {
      username: 'KirbyTwister',
      firebaseId: 'Kok',
      timezone: 'UTC+2',
    },
  });

  const stan = await prisma.user.create({
    data: {
      username: 'Stan',
      firebaseId: 'Kek',
      timezone: 'UTC+1',
    },
  });

  const osuGame = await prisma.game.create({
    data: {
      name: 'osu!',
    },
  });

  const otherOsuGames = await prisma.game.createMany({
    data: [
      {
        name: 'osu!taiko',
      },
      {
        name: 'osu!mania',
      },
      {
        name: 'osu!catch',
      },
    ],
  });

  const kirbyOrg = await prisma.organisation.create({
    data: {
      name: 'KirbyOrg',
      members: {
        connect: {
          username: kirby.username,
        },
      },
    },
  });

  const kirbyTeam = await prisma.team.create({
    data: {
      name: 'KirbyTeam',
      members: {
        connect: {
          id: kirby.id,
        },
      },
    },
  });

  const stanTeam = await prisma.team.create({
    data: {
      name: 'StanTeam',
      members: {
        connect: {
          id: stan.id,
        },
      },
    },
  });

  const kirbyOrgEvent = await prisma.event.create({
    data: {
      eventType: 'Tournament',
      name: 'KirbyOrgEvent',
      gameId: osuGame.id,
      organisationId: kirbyOrg.id,
      startTime: new Date(),
      teamSize: 8,
      playingTeamSize: 4,
      upperRankLimit: 1000,
      lowerRankLimit: 10000,
      qualifierType: 'Qualifiers',
      bracketType: 'Single Elimination',
      participants: {
        connect: [
          {
            id: kirbyTeam.id,
          },
          {
            id: stanTeam.id,
          },
        ],
      },
    },
    include: {
      game: true,
      organisation: true,
      participants: true,
    },
  });

  const osuMap = await prisma.map.create({
    data: {
      osuBeatmapId: 1,
      cs: 4,
      ar: 6,
      od: 6,
      hp: 2,
      bpm: 120,
      length: '2:22',
      artist: 'Kenji Ninuma',
      title: 'DISCO PRINCE',
      mapper: 'peppy',
    },
  });

  const kirbyOrgEventRound = await prisma.round.create({
    data: {
      name: 'Ro32',
      eventId: kirbyOrgEvent.id,
      maps: {
        connect: [
          {
            id: osuMap.id,
          },
        ],
      },
    },
  });

  const kirbyOrgEventRoundMatch = await prisma.match.create({
    data: {
      teams: {
        connect: [
          {
            id: kirbyTeam.id,
          },
          {
            id: stanTeam.id,
          },
        ],
      },
      scores: {
        create: [
          {
            points: 995432,
            accuracy: 99.32,
            rank: ScoreRanksEnum.S,
            mods: 0,
            time: new Date(),
            userId: kirby.id,
            mapId: osuMap.id,
          },
          {
            points: 995432,
            accuracy: 99.32,
            rank: ScoreRanksEnum.SH,
            mods: 8,
            time: new Date(),
            userId: stan.id,
            mapId: osuMap.id,
          },
        ],
      },
      roundId: kirbyOrgEventRound.id,
    },
  });
};

prisma.$transaction(main).then(async () => {
  console.log('Data seed completed!');
  await prisma.$disconnect();
});
