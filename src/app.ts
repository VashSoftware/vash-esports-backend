import dotenv from 'dotenv';
import express from "express";
import {Sequelize} from "sequelize";
import cors from "cors";
import defineBadge from "./models/Badge.js";
import defineEvent from "./models/Event.js";
import defineGame from "./models/Game.js";
import defineMap from "./models/Map.js";
import defineMatch from "./models/Match.js";
import defineOrganisation from "./models/Organisation.js";
import definePool from "./models/Pool.js";
import defineRating from "./models/Rating.js";
import defineRole from "./models/Role.js";
import defineRound from "./models/Round.js";
import defineScore from "./models/Score.js";
import defineStaffRole from "./models/StaffRole.js";
import defineTeam from "./models/Team.js";
import defineUser from "./models/User.js";
import defineUserRole from "./models/UserRole.js";
import validator from "validator";

dotenv.config();

const app = express();
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql'
});

sequelize.authenticate()
    .then(() => {
      console.log('Database connection successful');
    })
    .catch((error) => {
      console.error('Unable to connect to the database:', error);
    });

const Badges = defineBadge(sequelize);
const Events = defineEvent(sequelize);
const Games = defineGame(sequelize)
const Maps = defineMap(sequelize);
const Matches = defineMatch(sequelize);
const Organisations = defineOrganisation(sequelize);
const Pools = definePool(sequelize);
const Ratings = defineRating(sequelize);
const Roles = defineRole(sequelize);
const Rounds = defineRound(sequelize);
const Scores = defineScore(sequelize);
const StaffRoles = defineStaffRole(sequelize);
const Teams = defineTeam(sequelize);
const Users = defineUser(sequelize);
const UserRoles = defineUserRole(sequelize);

Users.hasMany(Badges);
Badges.belongsTo(Users);

Maps.hasMany(Scores);
Scores.belongsTo(Maps);

Matches.hasMany(Scores);
Scores.belongsTo(Matches);

Users.hasMany(Scores);
Scores.belongsTo(Users);

Organisations.hasMany(Events);
Events.belongsTo(Organisations);

Games.hasMany(Events);
Events.belongsTo(Games);

Events.hasMany(Rounds);
Rounds.belongsTo(Events);

Rounds.hasMany(Matches);
Matches.belongsTo(Rounds);

Users.hasMany(Ratings);
Ratings.belongsTo(Users);

Games.hasMany(Ratings);
Ratings.belongsTo(Games);

Teams.belongsToMany(Users, { through: 'TeamUsers' });
Users.belongsToMany(Teams, { through: 'TeamUsers' });

Events.belongsToMany(Teams, { through: 'Registrations' });
Teams.belongsToMany(Events, { through: 'Registrations' });

Users.belongsToMany(Roles, { through: 'UserRoles' });
Roles.belongsToMany(Users, { through: 'UserRoles' });

Users.belongsToMany(Organisations, { through: 'OrganisationUsers' });
Organisations.belongsToMany(Users, { through: 'OrganisationUsers' });

Matches.belongsTo(Teams, { as: 'team1', foreignKey: 'team1Id' });
Matches.belongsTo(Teams, { as: 'team2', foreignKey: 'team2Id' });

Events.hasMany(StaffRoles);
StaffRoles.belongsTo(Events);

Users.hasMany(StaffRoles);
StaffRoles.belongsTo(Users);

sequelize.sync({ alter: true })
    .then(() => {
        console.log('Database synchronized');
    })
    .catch((error) => {
        console.error('Error synchronizing database:', error);
    });

app.use(express.json());
app.use(cors({
    origin: '*'
}));

app.get('/api/events', async (req, res) => {
    const events = await Events.findAll({
        where: {
            finished: false
        }
    });

    res.send(events);
});

app.get('/api/events/:id', async (req, res) => {
    const eventById = await Events.findByPk(req.params.id, {
        include: [Organisations, Games, Teams, Rounds]
    });

    res.send(eventById);
});

app.post('/api/events', async (req, res) => {
    if (!req.body.name || !validator.isLength(req.body.name, { min: 1, max: 40 })) {
        return res.status(400).send({ error: 'Name is required and must be between 1 and 40 characters' });
    }

    // Validate the start time
    const now = new Date();
    const startTime = new Date(req.body.startTime);
    if (startTime <= now) {
        return res.status(400).send({ error: 'Start time must be later than now' });
    }

    // Validate the team size
    const teamSize = parseInt(req.body.teamSize);
    if (!teamSize || teamSize < 1 || teamSize > 8) {
        return res.status(400).send({ error: 'Team size must be between 1 and 8' });
    }

    // Validate the playing team size
    const playingTeamSize = parseInt(req.body.playingTeamSize);
    if (!playingTeamSize || playingTeamSize < 1 || playingTeamSize > 8) {
        return res.status(400).send({ error: 'Playing team size must be between 1 and 8' });
    }

    // Validate the lower rank limit
    const lowerRankLimit = req.body.lowerRankLimit;
    if (!Number.isInteger(lowerRankLimit) || lowerRankLimit <= 0) {
        return res.status(400).send({ error: 'Lower rank limit must be null or an integer above 0' });
    }

    // Validate the upper rank limit
    const upperRankLimit = req.body.upperRankLimit;
    if (!Number.isInteger(lowerRankLimit) || lowerRankLimit <= 0) {
        return res.status(400).send({ error: 'Upper rank limit must be null or an integer above 0' });
    }

    // Create the new event
    const newEvent = await Events.create({
        name: req.body.name,
        startTime: startTime,
        finished: false,
        teamSize: teamSize,
        playingTeamSize: playingTeamSize,
        lowerRankLimit: lowerRankLimit,
        upperRankLimit: upperRankLimit,
        gameId: req.body.gameId,
        organisationId: req.body.organisationId
    });

    res.send(newEvent);
});

app.get('/api/games', async (req, res) => {
    const games = await Games.findAll();

    res.send(games);
});

app.post('/api/games', async (req, res) => {
    const newGame = await Games.create({
        name: req.body.name
    });

    res.send(newGame);
});

app.get('/api/maps', async (req, res) => {
    const maps = await Maps.findAll();

    res.send(maps);
});

app.post('/api/maps', async (req, res) => {
    const newMap = await Maps.create({
        name: req.body.name
    });

    res.send(newMap);
});

app.get('/api/matches', async (req, res) => {
    const matches = await Matches.findAll();

    res.send(matches);
});

app.get('/api/matches/:id', async (req, res) => {
    const matchById = await Matches.findByPk(req.params.id, {
        include: [Rounds, Scores]
    });

    res.send(matchById);
});

app.post('/api/matches', async (req, res) => {
    const newMatch = await Matches.create({
        finished: false,
        roundId: req.body.roundId
    });

    res.send(newMatch);
});

app.get('/api/organisations', async (req, res) => {
    const userId = req.query.userId;

    // Find the user by id
    // @ts-ignore
    const user = await Users.findByPk(userId);

    // Find all organizations associated with the user
    // @ts-ignore
    const organisations = await user.getOrganisations();

    res.send(organisations);
});

app.post('/api/organisations', async (req, res) => {
    const newOrganisation = await Organisations.create({
        name: req.body.name
    });

    const user = await Users.findByPk(req.body.userId);
    // @ts-ignore
    await newOrganisation.addUser(user);

    res.send(newOrganisation);
});

app.get('/api/registrations', async (req, res) => {
    // @ts-ignore
    const registrations = await Registrations.findAll();

    res.send(registrations);
});

app.post('/api/registrations', async (req, res) => {
    // check if team is already registered
    const existingRegistration = await sequelize.models.Registrations.findOne({
        where: {
            EventId: req.body.eventId,
            TeamId: req.body.teamId
        }
    });

    if (existingRegistration) {
        return res.status(400).send({ error: 'Team is already registered for this event' });
    }

    const newRegistration = await sequelize.models.Registrations.create({
        EventId: req.body.eventId,
        TeamId: req.body.teamId
    });

    res.send(newRegistration);
});

app.get('/api/teams', async (req, res) => {
    const teams = await Teams.findAll();

    res.send(teams);
});

app.post('/api/teams', async (req, res) => {
    const newTeam = await Teams.create({
        name: req.body.name
    });

    const user = await Users.findByPk(req.body.userId);
    // @ts-ignore
    await newTeam.addUser(user);

    res.send(newTeam);
});

app.listen(4000);