import {DataTypes, Sequelize} from "sequelize";

export default function define(sequelize: Sequelize) {
    return sequelize.define('User', {
        firebaseId: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        timeZone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        osuId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        discordId: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    });
}