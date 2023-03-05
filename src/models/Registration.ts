import {DataTypes, Sequelize} from "sequelize";

export default function define(sequelize: Sequelize) {
    return sequelize.define('Registrations', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        }
    });
}