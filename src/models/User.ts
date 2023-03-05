import {DataTypes, Sequelize} from "sequelize";

export default function define(sequelize: Sequelize) {
    return sequelize.define('User', {
        firebaseId: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'user',
        },
    });
}