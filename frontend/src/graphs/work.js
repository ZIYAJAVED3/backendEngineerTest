import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Text, Cell } from 'recharts';
import axios from 'axios';

const HorizontalBarGraph = () => {
    const [data, setData] = useState([]);
    const valueLabels = {
        1: { label: "Employed", color: "#8884d8" },
        2: { label: "SAH parent", color: "#82ca9d" },
        3: { label: "Retired", color: "#ffc658" },
        4: { label: "Student", color: "#d0ed57" },
        5: { label: "Homemaker", color: "#a4de6c" },
        6: { label: "Caregiver", color: "#d88884" },
        7: { label: "Volunteer", color: "#8dd1e1" },
        8: { label: "Unemployed", color: "#ff8042" }
    };
    
    useEffect(() => {
        axios.get('http://localhost:3001/api/work')
            .then(response => {
                const formattedData = response.data.map(item => ({
                    ...item,
                    label: valueLabels[item.value].label,
                    color: valueLabels[item.value].color
                }));

                setData(formattedData);
                console.log(formattedData)
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
  
    return (
        <>
            <h1>Work Variable Distribution</h1>
            <ResponsiveContainer width="100%" height={400}>
                <BarChart
                    data={data}
                    layout="vertical"
                    margin={{
                        top: 20, right: 30, left: 20, bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="label" type="category" />
                    <Tooltip />
                    <Legend />
                    {/* {data.map((entry, index) => (
                        <Bar
                            key={index}
                            dataKey="count"
                            fill={entry.color}
                            stackId="a"
                        />
                    ))} */}

                    {/* <YAxis
                        yAxisId={0}
                        dataKey={'label'}
                        type="category"
                        axisLine={false}
                        tickLine={false}
                        tick={YAxisLeftTick}
                    /> */}
                    {/* <YAxis
                        orientation="left"
                        yAxisId={1}
                        dataKey={'label'}
                        type="category"
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={value => value.toLocaleString()}
                        mirror
                        tick={{
                            transform: `translate(${100 + 10}, 0)`
                        }}
                    /> */}
                    <Bar dataKey={'count'} minPointSize={2} barSize={32}>
                        {data.map((d, idx) => {
                            return <Cell key={d['label']} fill={d.color} />;
                        })}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </>
    );
}

export default HorizontalBarGraph;
