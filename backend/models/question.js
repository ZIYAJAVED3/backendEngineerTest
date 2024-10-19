// models/question.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Question = sequelize.define('Question', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    order_no: DataTypes.INTEGER,
    client_id: DataTypes.INTEGER,
    page_id: DataTypes.INTEGER,
    section_id: DataTypes.INTEGER,
    question: DataTypes.TEXT,
    placeholder: DataTypes.STRING,
    question_type: {
        type: DataTypes.ENUM('assessment', 'additional', 'form'),
        defaultValue: 'assessment'
    },
    answer_type: {
        type: DataTypes.STRING,
        defaultValue: 'slider'
    },
    mandatory: {
        type: DataTypes.ENUM('yes', 'no'),
        defaultValue: 'yes'
    },
    variable: DataTypes.STRING,
    na: {
        type: DataTypes.ENUM('yes', 'no'),
        defaultValue: 'no'
    },
    na_value: DataTypes.STRING,
    jump_logic: {
        type: DataTypes.ENUM('yes', 'no'),
        defaultValue: 'no'
    },
    display_logic: {
        type: DataTypes.ENUM('yes', 'no'),
        defaultValue: 'no'
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'questions',
    timestamps: false
});

module.exports = Question;

