// index.js
const express = require('express');
const bodyParser = require('body-parser');
const { sequelize, UserAssessment, UserAssessmentVariable } = require('./models');
const cors = require('cors');

const app = express();

app.use(cors()); // Enable CORS for all routes

app.use(bodyParser.json());

// Endpoint to get counts for the 'work' variable
app.get('/api/work', async (req, res) => {
    try {
        const results = await sequelize.query(`
            SELECT users_assessments_82_variables.score as value, COUNT(*) as count
            FROM users_assessments_82_variables
            JOIN users_assessments ON users_assessments_82_variables.user_assessment_id = users_assessments.id
            WHERE users_assessments.status = 'complete' AND users_assessments_82_variables.variable = 'work'
            GROUP BY users_assessments_82_variables.score
        `, { type: sequelize.QueryTypes.SELECT });

        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


// Endpoint to get counts for the 'work' variable
app.get('/api/worklocation', async (req, res) => {
    try {
        const results = await sequelize.query(`
            SELECT users_assessments_82_variables.score as value, COUNT(*) as count
            FROM users_assessments_82_variables
            JOIN users_assessments ON users_assessments_82_variables.user_assessment_id = users_assessments.id
            WHERE users_assessments.status = 'complete' AND users_assessments_82_variables.variable = 'location'
            GROUP BY users_assessments_82_variables.score
        `, { type: sequelize.QueryTypes.SELECT });

        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


const workLabels = {
    1: { label: "Employed", color: "#8884d8" },
    2: { label: "SAH parent", color: "#82ca9d" },
    3: { label: "Retired", color: "#ffc658" },
    4: { label: "Student", color: "#d0ed57" },
    5: { label: "Homemaker", color: "#a4de6c" },
    6: { label: "Caregiver", color: "#d88884" },
    7: { label: "Volunteer", color: "#8dd1e1" },
    8: { label: "Unemployed", color: "#ff8042" }
};

// Endpoint to get counts for the 'endowment' variable grouped by 'work'
app.get('/api/endowments', async (req, res) => {
    try {
        const results = await sequelize.query(`
            SELECT work_variable.score as work, endowment_variable.score as endowment, COUNT(*) as count
            FROM users_assessments_82_variables as work_variable
            JOIN users_assessments_82_variables as endowment_variable ON work_variable.user_assessment_id = endowment_variable.user_assessment_id
            JOIN users_assessments ON work_variable.user_assessment_id = users_assessments.id
            WHERE users_assessments.status = 'complete' AND work_variable.variable = 'work' AND endowment_variable.variable = 'endowment'
            GROUP BY work_variable.score, endowment_variable.score
        `, { type: sequelize.QueryTypes.SELECT });

                
        const groupedData = results.reduce((acc, { work, endowment, count }) => {
            if (!acc[endowment]) acc[endowment] = [];
            acc[endowment].push({
                value: work,
                count,
                label: workLabels[work].label,
                color: workLabels[work].color
            });
            return acc;
        }, {});
        
        res.json(groupedData);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

const PORT = process.env.PORT || 3001;
sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
