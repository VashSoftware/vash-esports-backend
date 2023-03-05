import dotenv from 'dotenv';
import express from "express";
import {Sequelize} from "sequelize";
import cors from "cors";
import defineGame from "./models/Game.js";
import defineEvent from "./models/Event.js";
import defineOrganisation from "./models/Organisation.js";
import defineRegistration from "./models/Registration.js";

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

const game = defineGame(sequelize);
const event = defineEvent(sequelize);
const organisation = defineOrganisation(sequelize);
const registration = defineRegistration(sequelize);

organisation.hasMany(event);
game.hasMany(event);
registration.belongsTo(event);

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
    const events = await event.findAll({
        where: {
            finished: false
        }
    });

    res.send(events);
});

app.post('/api/events', async (req, res) => {
    const newEvent = await event.create({
        name: req.body.name,
        startTime: new Date(),
        finished: false
    });

    res.send(newEvent);
});

app.get('/api/games', async (req, res) => {
    const games = await game.findAll();

    res.send(games);
});

app.post('/api/games', async (req, res) => {
    const newGame = await game.create({
        name: req.body.name
    });

    res.send(newGame);
});

app.get('/api/organisations', async (req, res) => {
    const organisations = await organisation.findAll();

    res.send(organisations);
});

app.post('/api/organisations', async (req, res) => {
    const newOrganisation = await organisation.create({
        name: req.body.name
    });

    res.send(newOrganisation);
});

app.listen(4000);