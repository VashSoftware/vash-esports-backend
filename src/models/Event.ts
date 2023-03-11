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
        type: {
            type: DataTypes.STRING,
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
        started: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        finished: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        osuForumThreadId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        challongeId: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });
}