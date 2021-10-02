import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Box, Text, Flex, Button, Stack } from "@chakra-ui/react";
import { Link } from "react-router-dom"

import { useJobITsQuery } from '../../generated/graphql';

// import "./chart.css"
interface Props { }

const Chart: React.FC<Props> = () => {
    const [{ data }] = useJobITsQuery()
    // "titled": "ทดสอบแจ้งงาน",
    // "desiredDate": "13/09/2021",
    // "category": "hardware",
    // "status": "New",
    // "itComment": null,
    // "itActionName": null,
    // "creatorId": 36,
    // "createdAt": "1632108136178",
    // "updatedAt": "1632108136178",

    // console.log(data?.jobITs)
    const testDate = data?.jobITs?.filter(count => (count.status === "New" && count.category === "hardware"))

    const dataCh = [
        {
            month: 'january',
            Altas: 5,
            Hardware: testDate?.length,
            Software: 9,
            Network: 4,
            Email: 4,
            UPS: 2,
            โทรศัพท์: 3,
        },
        {
            month: 'February',
            Altas: 4,
            Hardware: 12,
            Software: 5,
            Network: 5,
            Email: 6,
            UPS: 1,
            โทรศัพท์: 4,
        },
        {
            month: 'March',
            Altas: 6,
            Hardware: 5,
            Software: 10,
            Network: 4,
            Email: 2,
            UPS: 1,
            โทรศัพท์: 5,
        },
        {
            month: 'April',
            Altas: 2,
            Hardware: 9,
            Software: 5,
            Network: 9,
            Email: 3,
            UPS: 0,
            โทรศัพท์: 1,
        },
    ];
    return (
        // <div className="chart">
        //     <h3 className="chartTitle">วันหยุดแต่ละเดือน</h3>
        // {/* {fetching &&
        //      <h3 className="chartTitle">Loading...</h3>
        //   } */}
        <Flex flexDir="column" w={["100%", "100%", "100%", "100%", "60%"]} boxShadow="md" rounded="lg" p="5">
            <Stack isInline align="baseline" justify="space-between" mb={4}>
                <Text ml="3" fontSize="md" fontWeight="bold">ประวัติการแจ้ง job IT</Text>
                <Flex justify="center">
                    <Link to="/admin/manage-job-it">
                        <Button mt="3" align="center" a="i" fontSize="2xl" colorScheme="green" color="#fff">
                            จัดการ Job IT
                        </Button>
                    </Link>
                </Flex>
            </Stack>
            <Box h="400px" >
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                    width={500}
                    height={300}
                        data={dataCh}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                    <YAxis />
                        <Tooltip />
                        <Bar dataKey="Altas" fill="#87CEFA" />
                        <Bar dataKey="Hardware" fill="#4682B4" />
                        <Bar dataKey="Software" fill="#00BFFF" />
                        <Bar dataKey="Network" fill="#1E90FF" />
                        <Bar dataKey="Email" fill="#20B2AA" />
                        <Bar dataKey="UPS" fill="#66CDAA" />
                        <Bar dataKey="โทรศัพท์" fill="#40E0D0" />
                    </BarChart>
            </ResponsiveContainer>
            </Box>
        </Flex>
    )
}

export default Chart