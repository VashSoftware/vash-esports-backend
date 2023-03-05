import {DataTypes, Sequelize} from "sequelize";

export default function define(sequelize: Sequelize) {
    return sequelize.define('Organisation', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });
}