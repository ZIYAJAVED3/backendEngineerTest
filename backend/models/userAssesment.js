// models/userAssessment.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const UserAssessment = sequelize.define('UserAssessment', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    period: DataTypes.INTEGER,
    client_id: DataTypes.INTEGER,
    unique_id: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    parent_id: DataTypes.INTEGER,
    source: DataTypes.STRING,
    assessment_leader: DataTypes.INTEGER,
    score: DataTypes.INTEGER,
    sub_score_1: DataTypes.INTEGER,
    sub_score_2: DataTypes.INTEGER,
    sub_score_3: DataTypes.INTEGER,
    sub_score_4: DataTypes.INTEGER,
    sub_score_5: DataTypes.INTEGER,
    sub_score_6: DataTypes.INTEGER,
    sub_score_7: DataTypes.INTEGER,
    sub_score_8: DataTypes.INTEGER,
    sub_score_9: DataTypes.INTEGER,
    designation: DataTypes.STRING,
    status: {
        type: DataTypes.ENUM('pending', 'complete'),
        defaultValue: 'pending'
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
    tableName: 'users_assessments',
    timestamps: false
});

module.exports = UserAssessment;
