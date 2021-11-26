import React from "react";
import { AreaChart, Area, Tooltip, ResponsiveContainer } from "recharts";
import { Flex, Text } from "@chakra-ui/react";

import "../../styles/_chart-sales-target.scss";

interface Props {
    colorBranch: string;
    colorBranchPass: string;
}

const SalesTarget: React.FC<Props> = ({ colorBranch, colorBranchPass }) => {
    const dataTarget = [
        {
            name: "มกราคม",
            data: 70_000_000,
        },
        {
            name: "กุมภาพันธ์",
            data: 90_000_000,
        },
        {
            name: "มีนาคม",
            data: 60_000_000,
        },
        {
            name: "พฤษภาคม",
            data: 100_000_000,
        },
        {
            name: "มิถุนายน",
            data: 150_000_000,
        },
        {
            name: "กรกฎาคม",
            data: 50_000_000,
        },
        {
            name: "สิงหาคม",
            data: 80_000_000,
        },
    ];

    return (
        <Flex
            mx="5"
            w="60%"
            h="200px"
            rounded="7px"
            boxShadow="md"
            justify="space-between"
        >
            <Flex flexDir="column" w="60%">
                <Text ml="6">เป้ายอดขายปี 2022</Text>
                <Text ml="6" fontWeight="bold" fontSize="xl">1,000,000</Text>
                <div className="revenue">
                    <div className="graph">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart
                                width={500}
                                height={400}
                                data={dataTarget}
                                margin={{
                                    top: 0,
                                    right: 0,
                                    left: 0,
                                    bottom: 0,
                                }}
                            >
                                <defs>
                                    <linearGradient id="color" x1="0" x2="0" y1="0" y2="1">
                                        <stop offset="30%" stopColor={colorBranchPass} stopOpacity={0.4} />
                                        <stop
                                            offset="85%"
                                            stopColor={`${colorBranch}11`}
                                            stopOpacity={0.2}
                                        />
                                    </linearGradient>
                                </defs>
                                <Tooltip cursor={false} />
                                <Area
                                    type="monotone"
                                    dataKey="data"
                                    stroke={colorBranch}
                                    fill="url(#color)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </Flex>

            <Flex flexDir="column" w="40%" justify="space-evenly" mr="2">
                <Flex flexDir="column" rounded="7px" boxShadow="md">
                    <Text >เป้ายอดขายปัจจุบัน</Text>
                    <Text fontWeight="bold" fontSize="xl">900,000,000</Text>
                </Flex>
                <Flex flexDir="column" rounded="7px" boxShadow="md">
                    <Text>ยอดขายจริง ณ ปัจจุบัน</Text>
                    <Text fontWeight="bold" fontSize="xl">800,000,000</Text>
                </Flex>
                <Flex flexDir="column" rounded="7px" boxShadow="md">
                    <Text>คิดเป็น % ของเป้ายอดขาย ณ ปัจจุบัน</Text>
                    <Text fontWeight="bold" fontSize="xl">90.99%</Text>
                </Flex>
            </Flex>
        </Flex>
    );
};

export default SalesTarget;
