import {DataTypes, Sequelize} from "sequelize";
import sequelize from "../app";

const Game = sequelize.define('Game', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {

});

export default Game;