import React from 'react'
import { Box, Text } from "@chakra-ui/react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';



type MonthValue = {
    มกราคม: number;
    กุมภาพันธ์: number;
    มีนาคม: number;
    เมษายน: number;
    พฤษภาคม: number;
    มิถุนายน: number;
    กรกฎาคม: number;
    สิงหาคม: number;
    กันยายน: number;
    ตุลาคม: number;
    พฤศจิกายน: number;
    ธันวาคม: number;
}


interface Props {
    label: string
    monthValue: MonthValue
}

const IssueChart: React.FC<Props> = ({ label, monthValue }) => {


    const targetKpi = 5500;
    const strategyLine = 6000;
    const safetyLine = 6500;

    const data = [
        {
            name: "1",
            safety_line: safetyLine,
            Target_กลยุทธ์: strategyLine,
            Target_KPI: targetKpi,
            action: monthValue.มกราคม,
        },
        {
            name: "2",
            safety_line: safetyLine,
            Target_กลยุทธ์: strategyLine,
            Target_KPI: targetKpi,
            action: monthValue.กุมภาพันธ์,
        },
        {
            name: "3",
            safety_line: safetyLine,
            Target_กลยุทธ์: strategyLine,
            Target_KPI: targetKpi,
            action: monthValue.มีนาคม,
        },
        {
            name: "4",
            safety_line: safetyLine,
            Target_กลยุทธ์: strategyLine,
            Target_KPI: targetKpi,
            action: monthValue.เมษายน,
        },
        {
            name: "5",
            safety_line: safetyLine,
            Target_กลยุทธ์: strategyLine,
            Target_KPI: targetKpi,
            action: monthValue.พฤษภาคม,
        },
        {
            name: "6",
            safety_line: safetyLine,
            Target_กลยุทธ์: strategyLine,
            Target_KPI: targetKpi,
            action: monthValue.มิถุนายน,
        },
        {
            name: "7",
            safety_line: safetyLine,
            Target_กลยุทธ์: strategyLine,
            Target_KPI: targetKpi,
            action: monthValue.กรกฎาคม,
        },
        {
            name: "8",
            safety_line: safetyLine,
            Target_กลยุทธ์: strategyLine,
            Target_KPI: targetKpi,
            action: monthValue.สิงหาคม,
        },
        {
            name: "9",
            safety_line: safetyLine,
            Target_กลยุทธ์: strategyLine,
            Target_KPI: targetKpi,
            action: monthValue.กันยายน,
        },
        {
            name: "10",
            safety_line: safetyLine,
            Target_กลยุทธ์: strategyLine,
            Target_KPI: targetKpi,
            action: monthValue.ตุลาคม,
        },
        {
            name: "11",
            safety_line: safetyLine,
            Target_กลยุทธ์: strategyLine,
            Target_KPI: targetKpi,
            action: monthValue.พฤศจิกายน,
        },
        {
            name: "12",
            safety_line: safetyLine,
            Target_กลยุทธ์: strategyLine,
            Target_KPI: targetKpi,
            action: monthValue.ธันวาคม,
        }
    ];

    return (
        <Box
            mr="3"
            p="2"
            paddingBottom="8"
            h={["250px", "250px", "250px", "250px", "250px", "330px"]}
            align="center"
        >
            <Text fontWeight="semibold" mb="-2">
                {label}
            </Text>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" orientation="left" />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="action" fill="#64c9e2" />
                </BarChart>
            </ResponsiveContainer>
        </Box>
    )
}

export default IssueChart