const { DataTypes } = require("sequelize");
const sequelize = require("../../database/conexao");

const Comment = sequelize.define(
    "Comment",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },

        content: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
    },
    {
        tableName: "comments",
        timestamps: true,
    }
);

module.exports = Comment;