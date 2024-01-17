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
            validate: {
                isAlpha: true,
            }
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: false,
            validate: {
                isAlpha: true,
            }
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
            type: DataTypes.BIGINT,
            allowNull: true,
            validate: {
                isNumeric: true,
            },
        },
        last_modified: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            validate: {
                isDate: true,
            },
            defaultValue: DataTypes.NOW,
            
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
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'contact',
    }
);

module.exports = Contact;
