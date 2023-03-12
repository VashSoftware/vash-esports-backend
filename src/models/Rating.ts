import {DataTypes, Sequelize} from "sequelize";

export default function define(sequelize: Sequelize) {
    return sequelize.define('Rating', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    });
}