import React from 'react';
import { Box, } from "@chakra-ui/react";
import {
    ComposedChart,
    Line,
    Area,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

const data = [
    {
        name: 'New',
        uv: 590,
        pv: 800,
        amt: 1400,
    },
    {
        name: 'Preparing',
        uv: 868,
        pv: 967,
        amt: 1506,
    },
    {
        name: 'Success',
        uv: 1397,
        pv: 1098,
        amt: 989,
    },
];


interface Props { }

const ChartStatus: React.FC<Props> = () => {
    return (
        <>
            <Box h="300px" >
                <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart
                        layout="vertical"
                        width={500}
                        height={400}
                        data={data}
                        margin={{
                            top: 20,
                            right: 20,
                            bottom: 20,
                            left: 20,
                        }}
                    >
                        <CartesianGrid stroke="#f5f5f5" />
                        <XAxis type="number" />
                        <YAxis dataKey="name" type="category" scale="band" />
                        <Tooltip />
                        <Area dataKey="amt" fill="#8884d8" stroke="#8884d8" />
                        <Bar dataKey="pv" barSize={20} fill="#413ea0" />
                        <Bar dataKey="uv" barSize={20} fill="#ff7300" />
                        <Line dataKey="uv" stroke="#ff7300" />
                    </ComposedChart>
                </ResponsiveContainer>
            </Box>
        </>
    );
}


export default ChartStatus