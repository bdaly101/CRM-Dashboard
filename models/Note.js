const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Note extends Model { }

Note.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        body: {
            type: DataTypes.TEXT('long'),
            notEmpty: true,
        },
        contact_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'contact',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'note',
    }
);

module.exports = Note;
