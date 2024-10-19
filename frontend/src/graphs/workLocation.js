import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';

const PieChartComponent = () => {
    const [data, setData] = useState([]);

    const valueLabels = {
        1: { label: "Workplace", color: "#8884d8" },
        2: { label: "Hybrid", color: "#82ca9d" },
        3: { label: "Remote", color: "#ffc658" }
    };

    useEffect(() => {
        axios.get('http://localhost:3001/api/worklocation')
            .then(response => {
                const formattedData = response.data.map(item => ({
                    ...item,
                    label: valueLabels[item.value].label,
                    color: valueLabels[item.value].color
                }));

                setData(formattedData);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <>
            <h1>Work Variable Distribution</h1>
            <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="count"
                        nameKey="label"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        label
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </>
    );
}

export default PieChartComponent;
