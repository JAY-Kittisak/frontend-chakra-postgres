import React from 'react'
import { Box, Text } from "@chakra-ui/react";
import {
    Bar,
    Line,
    Cell,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    ComposedChart
} from "recharts";

import { RegularSalesVisitFragment } from '../../generated/graphql';

interface Props {
    colorBranch: string;
    countVisit: number
    monthlyVisit: RegularSalesVisitFragment[] | undefined
}

const VisitChart: React.FC<Props> = ({
    colorBranch,
    countVisit,
    monthlyVisit
}) => {

    const greenLine = countVisit / 12
    let dataDate = []
    const dt = new Date();
    const month = dt.getMonth();
    const year = dt.getFullYear();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const targetDay = Math.ceil(greenLine / daysInMonth)

    for (let i = 0; i < daysInMonth; i++) {
        dataDate.push({
            id: `${i + 1}`,
            target: targetDay,
            current: monthlyVisit ? monthlyVisit.filter(value => {
                const date = new Date(+value.createdAt)

                return date.getDate() === i + 1
            }).length : 0,
        })
    }

    return (
        <Box 
            w="100%" 
            h="300px" 
            mt='3' 
            ml="3" 
            rounded="7px" 
            boxShadow="md" 
            borderWidth='1px'
        >
            <Text
                mt="2"
                align='center'
                fontSize="2xl"
            >
                จำนวนการเข้าพบลูกค่าให้แต่ละเดือน
            </Text>
            <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                    width={500}
                    height={300}
                    data={dataDate}
                    margin={{
                        top: 5,
                        right: 10,
                        left: 0,
                        bottom: 50,
                    }}
                >
                    <XAxis dataKey="id" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="current" fill={colorBranch}>
                        {dataDate.map((_, index) => (
                            <Cell key={`cell-${index}`} />
                        ))}
                    </Bar>
                    <Line type="monotone" dataKey="target" stroke="#3ae723" />
                </ComposedChart>
            </ResponsiveContainer>
        </Box>
    )
}

export default VisitChart