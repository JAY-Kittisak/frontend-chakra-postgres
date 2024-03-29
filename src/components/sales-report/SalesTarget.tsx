import React, { useEffect, useState } from "react";
import { Flex, Text } from "@chakra-ui/react";
import { AreaChart, Area, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import CountUp from 'react-countup';

import "../../styles/_chart-sales-target.scss";
import { RegularSalesTargetFragment } from "../../generated/graphql";
import { reducer } from "../../utils/helpers";

interface Props {
    colorBranch: string;
    colorBranchPass: string
    targets: RegularSalesTargetFragment[] | undefined
    dateBegin: string
    sumValueIssue: number
}

type CalTarget = {
    year: string
    valueInYear: number
    currentMonth: number
}

const SalesTarget: React.FC<Props> = ({ 
    colorBranch, 
    colorBranchPass, 
    targets, 
    dateBegin,
    sumValueIssue
}) => {
    const [percentNum, setPercentNum] = useState(0)
    const [ calTarget, setCalTarget ] = useState<CalTarget>({
        year: '2022',
        valueInYear: 0,
        currentMonth: 0
    })
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

    let remaining = 0
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
        if (!targets) return

        const [ year, month] = dateBegin.split('-')

        const valueInYear = targets.map(value => value.valueIssue).reduce(reducer, 0)
        const currentMonth = (valueInYear / 12) * +month

        setCalTarget({
            year,
            valueInYear,
            currentMonth
        })

    }, [targets,dateBegin])

    useEffect(() => {
        if (calTarget.currentMonth === 0) return setPercentNum(0)

        const calPercent = (sumValueIssue * 100) / calTarget.currentMonth
        
        if (calPercent > 100) {
            setPercentNum(100)
        } else {
            const percent = calPercent.toFixed(0)
            setPercentNum(+percent)
        }

    }, [sumValueIssue, calTarget])

    return (
        <>
            <Flex
                mr="3"
                w="30%"
                h="230px"
                rounded="7px"
                boxShadow="md"
                justify="space-between"
            >
                <Flex flexDir="column" w="100%">
                    <Flex justify="space-between">
                        <Flex flexDir="column">
                            <Text ml="6" fontWeight="bold" fontSize="xl">
                                {calTarget.valueInYear}
                            </Text>
                            <Text ml="6" fontSize="sm" color="gray">
                                เป้า Issue ปี {calTarget.year}
                            </Text>
                        </Flex>
                    </Flex>
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
                                            <stop
                                                offset="30%"
                                                stopColor={colorBranchPass}
                                                stopOpacity={0.4}
                                            />
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
            </Flex>

            <Flex
                flexDir="column"
                w="30%"
                h="230px"
                justify="space-evenly"
                rounded="7px"
                boxShadow="md"
            >
                <Flex justify="space-around" mb="70">
                    <Flex flexDir="column" align="center">
                        <Text fontWeight="bold" fontSize="xl">
                            {calTarget.currentMonth}
                        </Text>
                        <Text fontSize="sm" color="gray">
                            เป้า Issue ณ ปัจจุบัน
                        </Text>
                    </Flex>
                    <Flex flexDir="column" align="center">
                        <Text fontWeight="bold" fontSize="xl">
                            {sumValueIssue}
                        </Text>
                        <Text fontSize="sm" color="gray">
                            มูลค่า Issue จริง ณ ปัจจุบัน
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
                <Text mt="130px" align="center">คิดเป็น % ของเป้า Issue ณ ปัจจุบัน</Text>


                {/* <Flex flexDir="column">
                    <div className="container-percent">
                        <div className="percent">
                            <svg>
                                <circle cx="70" cy="70" r="70"></circle>
                                <circle className="circle-cdc" cx="70" cy="70" r="70"></circle>
                            </svg>
                            <div className="percent-num">
                                <h2>
                                    90.9<span>%</span>
                                </h2>
                            </div>
                        </div>
                        <h2 className="percent-text">คิดเป็น % ของเป้ายอดขาย ณ ปัจจุบัน</h2>
                    </div>
                </Flex> */}
            </Flex>
        </>
    );
};

export default SalesTarget;
