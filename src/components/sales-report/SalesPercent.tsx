import React, { useEffect, useState } from 'react'
import { Flex, Text } from "@chakra-ui/react";
import { PieChart, Pie, Cell } from "recharts";
import CountUp from 'react-countup';

interface Props {
    colorBranch: string
}

const SalesPercent: React.FC<Props> = ({ colorBranch }) => {
    const [percentNum, setPercentNum] = useState(0)

    let remaining = 0
    const percent = 90.99
    const percentSplit = percent.toString().split(".")
    remaining = 100 - percentNum
    if (remaining < 0) {
        remaining = 0
    }
    const data = [
        { name: 'Group A', value: remaining },
        { name: 'Group B', value: percentNum },
    ];

    const COLORS = ['#d8d8d8', colorBranch];

    useEffect(() => {
        if (percentSplit) {
            setPercentNum(+percentSplit[0])
        }
    }, [percentSplit])
    return (
        <Flex
            flexDir="column"
            h="230px"
            justify="space-evenly"
            rounded="7px"
            boxShadow="md"
        >
            <Flex justify="space-around" mb="70">
                <Flex flexDir="column" align="center">
                    <Text fontWeight="bold" fontSize="xl">
                        20.35 M
                    </Text>
                    <Text fontSize="sm" color="gray">
                        เป้ายอดขาย ณ ปัจจุบัน
                    </Text>
                </Flex>
                <Flex flexDir="column" align="center">
                    <Text fontWeight="bold" fontSize="xl">
                        18.95 M
                    </Text>
                    <Text fontSize="sm" color="gray">
                        ยอดขายจริง ณ ปัจจุบัน
                    </Text>
                </Flex>
            </Flex>

            <Flex flexDir="column" justify="center" align="center" mt="-70px">
                <PieChart width={360} height={130}>
                    <Pie
                        data={data}
                        cx={175}
                        cy={60}
                        innerRadius={40}
                        outerRadius={55}
                        fill="#8884d8"
                        paddingAngle={0}
                        dataKey="value"
                    >
                        {data.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                </PieChart>
                <Text align="center" fontSize="xl" fontWeight="bold"
                    my="-80px"
                >
                    <CountUp start={0} end={percentNum} duration={2.5} separator=" " /><span>%</span>
                </Text>
            </Flex>
            <Text mt="130px" align="center">คิดเป็น % ของเป้ายอดขาย ณ ปัจจุบัน</Text>
        </Flex>
    )
}

export default SalesPercent