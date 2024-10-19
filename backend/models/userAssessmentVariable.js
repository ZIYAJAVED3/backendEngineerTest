// models/userAssessmentVariable.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const UserAssessmentVariable = sequelize.define('UserAssessmentVariable', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    period: DataTypes.INTEGER,
    user_assessment_id: DataTypes.INTEGER,
    variable: DataTypes.STRING,
    score: DataTypes.FLOAT,
    score_txt: DataTypes.STRING,
    results_score: DataTypes.STRING,
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'users_assessments_82_variables',
    timestamps: false
});

module.exports = UserAssessmentVariable;
