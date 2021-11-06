import React from "react";
import {
    Text,
    Flex,
    Box,
} from "@chakra-ui/react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

interface Props { }

const ViewQuota: React.FC<Props> = () => {

    const dataCh = [
        {
            name: "ลากิจ",
            quota: 6,
            action: 3
        },
        {
            name: "ลาป่วย",
            quota: 5,
            action: 2
        },
        {
            name: "ลาพักร้อน",
            quota: 4,
            action: 4
        },
        {
            name: "ลาอื่นๆ",
            quota: 5,
            action: 0
        },
    ];


    return (
        <Flex
            flexDir="column"
            w="30%"
            p="6"
            mt="8"
            ml="3"
            bg="white"
            boxShadow="xl"
            borderRadius="md"
        >
            <Flex justify="center">
                <Text fontSize="2xl" fontWeight="bold">จำนวนวันคงเหลือ</Text>
            </Flex>
            <Flex flexDir="column" mt="5">
                <Text>ลากิจ : 10 วัน ใช้ไปแล้ว 6 วัน</Text>
                <Text>ลาป่วย : 10 วัน ใช้ไปแล้ว 6 วัน</Text>
                <Text>ลาพักร้อน : 10 วัน ใช้ไปแล้ว 6 วัน</Text>
                <Text>ลาอื่นๆ : 0 วัน ใช้ไปแล้ว 6 วัน</Text>
                <Text>รวม : 26 วัน</Text>
            </Flex>

            <Box h="200px" ml="-10" mt="10">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        width={500}
                        height={300}
                        data={dataCh}
                        margin={{
                            top: 5,
                            right: 0,
                            left: 0,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="quota" fill="#64cc64" />
                        <Bar dataKey="action" fill="#15a515" />
                    </BarChart>
                </ResponsiveContainer>
            </Box>
        </Flex>
    )
}

export default ViewQuota