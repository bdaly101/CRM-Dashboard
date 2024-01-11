const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Contact extends Model { }

Contact.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: false,
            isAlpha: true,
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: false,
            isAlpha: true,
        },
        email: {
            type: DataTypes.STRING,
            unique: false,
            allowNull: true,
            validate: {
                isEmail: true,
            },
        },
        company: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        phone_number: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
                isNumeric: true,
            },
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id',
            },
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'contact',
    }
);

module.exports = Contact;
