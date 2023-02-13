import express from "express";
import {DataTypes, Sequelize} from "sequelize";

const sequelize = new Sequelize('dbmaster', 'dbmasteruser', 'f__jIN1}7G5wHHy..vott6$6_I>9Hlr=', {
  host: 'ls-bec3c291b52ce015668f14bf4520f861be917d0c.c3vcaiybra4g.eu-central-1.rds.amazonaws.com',
  dialect: 'mysql'
});

const Game = sequelize.define('Game', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {

});

await sequelize.sync({ force: true});
await Game.create({name: 'osu!'});

const app = express();
const port = 4000;

app.get('/', async (req, res) => {
  const games = await Game.findAll();

  res.send(games);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});

export default sequelize;