// models/index.js
const sequelize = require('../config/database');
const UserAssessment = require('./userAssesment.js');
const UserAssessmentVariable = require('./userAssessmentVariable.js');
const Question = require('./question.js');

UserAssessment.hasMany(UserAssessmentVariable, { foreignKey: 'user_assessment_id' });
UserAssessmentVariable.belongsTo(UserAssessment, { foreignKey: 'user_assessment_id' });

module.exports = {
    sequelize,
    UserAssessment,
    UserAssessmentVariable,
    Question
};
