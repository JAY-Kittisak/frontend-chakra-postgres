import React, { useState, useEffect } from 'react'
import { Box, Text, Flex } from "@chakra-ui/react";
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
import { selectMonth } from '../../utils/helpers'

type DataIssueMonth = { id: string, target: number, result: number }

interface Props {
    colorBranch: string;
    countVisit: number
    monthlyVisit: RegularSalesVisitFragment[] | undefined
    monthIndex: number
    colorBranchPass: string;
}

const initialDataIssue: DataIssueMonth[] = [{
    id: "",
    target: 0,
    result: 0
}]
const dt = new Date();
const month = dt.getMonth();
const year = dt.getFullYear();
const daysInMonth = new Date(year, month + 1, 0).getDate();

const VisitChart: React.FC<Props> = ({
    colorBranch,
    countVisit,
    monthlyVisit,
    monthIndex,
    colorBranchPass
}) => {
    const [ dataVisitMonth,setDataVisitMonth] = useState(initialDataIssue)

    const greenLine = countVisit / 12
    const targetDay = Math.ceil(greenLine / daysInMonth)

    useEffect(() => {
        let dataDate: DataIssueMonth[] = []
        for (let i = 0; i < daysInMonth; i++) {
            dataDate.push({
                id: `${i + 1}`,
                target: targetDay,
                result: monthlyVisit ? monthlyVisit.filter(value => {
                    const date = new Date(+value.createdAt)
    
                    return date.getDate() === i + 1
                }).length : 0,
            })
        }
        
        setDataVisitMonth(dataDate)
    }, [ monthlyVisit, targetDay])

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
            <Flex
                mt="2"
                alignItems='center'
                justifyContent="center"
                fontSize="2xl"
            >
                จำนวนการเข้าพบลูกค่าเดือน <Text fontWeight="bold" color={colorBranchPass}>&nbsp;{selectMonth[monthIndex]}</Text>
            </Flex>
            <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                    width={500}
                    height={300}
                    data={dataVisitMonth}
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
                    <Bar dataKey="result" fill={colorBranch}>
                        {dataVisitMonth.map((_, index) => (
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