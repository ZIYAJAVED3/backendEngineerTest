import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Text, Cell } from 'recharts';
import axios from 'axios';

const HorizontalBarGraph = () => {
    const [data, setData] = useState([]);
    const endowmentLabels = {
        "1": "True",
        "2": "Good",
        "3": "Beautiful",
        "4": "Prosperous",
        "5": "Sustainable",
        "6": "Just and Well-ordered",
    };
    
    useEffect(() => {
        axios.get('http://localhost:3001/api/endowments')
            .then(response => {
                const transformedData = Object.entries(response.data).map(([endowment, entries]) => {
                    const dataPoint = { endowment: endowmentLabels[endowment] || endowment };
                    entries.forEach(({ label, count }) => {
                        dataPoint[label] = count;
                    });
                    return dataPoint;
                });
                setData(transformedData);
                console.log(transformedData)
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const YAxisLeftTick = ({ y, payload: { value } }) => {
        return (
        <Text x={0} y={y} textAnchor="start" verticalAnchor="middle" scaleToFit>
            {value}
        </Text>
        );
    };
    const colors = {
        "Employed": "#8884d8",
        "SAH parent": "#82ca9d",
        "Retired": "#ffc658",
        "Volunteer": "#8dd1e1",
        "Caregiver": "#d88884",
        "Homemaker": "#a4de6c",
        "Student": "#d0ed57",
        "Unemployed": "#ff8042"
    };
    return (
        <>
            <h1>Work Variable Distribution</h1>
            <ResponsiveContainer width="100%" height={400}>
                <BarChart
                    data={data}
                    layout="vertical"
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis type="category" dataKey="endowment" />
                    <Tooltip />
                    <Legend />
                    {Object.keys(colors).map(label => (
                        <Bar dataKey={label} stackId="a" fill={colors[label]} key={label} />
                    ))}
                </BarChart>
            </ResponsiveContainer>
        </>
    );
}

export default HorizontalBarGraph;
