import {DataTypes, Sequelize} from "sequelize";

export default function define(sequelize: Sequelize) {
    return sequelize.define('Event', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        teamSize: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        playingTeamSize: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        lowerRankLimit: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        upperRankLimit: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        startTime: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        finished: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        }
    });
}