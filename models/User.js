const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class User extends Model {
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                len: [4],
            },
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isAlpha: true,
            },
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isAlpha: true,
            },
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8],
            },
        },
    },
    {
        hooks: {
            beforeCreate: async (newUserData) => {
                isLetterRegEx = /^[a-zA-Z-]+$/; // Aviliz-Daza
                // Source: https://emailregex.com/
                isEmailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                if (!isLetterRegEx.test(newUserData.first_name)) {
                    throw new Error('First name invalid. No special characters other than "-" allowed. Input: ', newUserData.first_name)
                }
                else if (!isLetterRegEx.test(newUserData.last_name)) {
                    throw new Error('Last name invalid. No special characters other than "-" allowed.')
                }
                else if (newUserData.username.length < 4) {
                    throw new Error('Username too short')
                }
                else if (!(isEmailRegEx.test(newUserData.email))) {
                    throw new Error('Email invalid.')
                }
                else{
                    newUserData.password = await bcrypt.hash(newUserData.password, 10);
                    return newUserData;
                }
            },
            beforeUpdate: async (updatedUserData) => {
                isLetterRegEx = /^[a-zA-Z-]+$/;
                // Source: https://emailregex.com/
                isEmailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                if (!isLetterRegEx.test(updatedUserData.first_name)) {
                    throw new Error('First name invalid. No special characters other than "-" allowed.')
                }
                else if (!isLetterRegEx.test(updatedUserData.last_name)) {
                    throw new Error('Last name invalid. No special characters other than "-" allowed.')
                }
                else if (updatedUserData.username.length < 4) {
                    throw new Error('Username too short')
                }
                else if (!(isEmailRegEx.test(updatedUserData.email))) {
                    throw new Error('Email invalid.')
                }
                else{
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                return updatedUserData;
                }
            },
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user',
    }
);

module.exports = User;
