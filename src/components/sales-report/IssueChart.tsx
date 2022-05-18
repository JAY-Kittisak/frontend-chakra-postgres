import React, { useState, useEffect, useCallback } from 'react'
import { Box, Flex, Text } from "@chakra-ui/react";
import {
    Bar,
    Line,
    Cell,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    ComposedChart
} from 'recharts';

import { RegularSalesIssueFragment, RegularSalesVisitFragment } from '../../generated/graphql';
import VisitChart from './VisitChart';
// import { reducer } from '../../utils/helpers'

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
    colorBranch: string;
    colorBranchPass: string;
    colorOnMouse: string;
    countIssue: number
    valueIssue: number
    monthValue: MonthValue
    setMonthIndex: (index: number) => void | undefined
    monthlyIssue: RegularSalesIssueFragment[] | undefined
    countVisit: number
    monthlyVisit: RegularSalesVisitFragment[] | undefined
}

const IssueChart: React.FC<Props> = ({
    colorBranch,
    colorBranchPass,
    colorOnMouse,
    countIssue,
    valueIssue,
    monthValue,
    setMonthIndex,
    monthlyIssue,
    countVisit,
    monthlyVisit
}) => {
    const [colorIndexZero, setColorIndexZero] = useState<
        number | undefined
    >(undefined);
    const [colorIndexOne, setColorIndexOne] = useState<
        number | undefined
    >(undefined);
    const [colorIndexTwo, setColorIndexTwo] = useState<
        number | undefined
    >(undefined);
    const [colorIndexThree, setColorIndexThree] = useState<
        number | undefined
    >(undefined);
    const [colorIndexFour, setColorIndexFour] = useState<
        number | undefined
    >(undefined);
    const [colorIndexFive, setColorIndexFive] = useState<
        number | undefined
    >(undefined);
    const [colorIndexSix, setColorIndexSix] = useState<
        number | undefined
    >(undefined);
    const [colorIndexSeven, setColorIndexSeven] = useState<
        number | undefined
    >(undefined);
    const [colorIndexEight, setColorIndexEight] = useState<
        number | undefined
    >(undefined);
    const [colorIndexNine, setColorIndexNine] = useState<
        number | undefined
    >(undefined);
    const [colorIndexTen, setColorIndexTen] = useState<
        number | undefined
    >(undefined);
    const [colorIndexEleven, setColorIndexEleven] = useState<
        number | undefined
    >(undefined);

    const [onMouseIndex, setOnMouseIndex] = useState<number | undefined>(undefined);

    const greenLine = countIssue / 12
    const greenLineValue = valueIssue / 12

    const dataCh = [
        {
            month: "มกราคม",
            target: greenLineValue,
            current: monthValue.มกราคม,
        },
        {
            month: "กุมภาพันธ์",
            target: greenLineValue,
            current: monthValue.กุมภาพันธ์,
        },
        {
            month: "มีนาคม",
            target: greenLineValue,
            current: monthValue.มีนาคม,
        },
        {
            month: "เมษายน",
            target: greenLineValue,
            current: monthValue.เมษายน,
        },
        {
            month: "พฤษภาคม",
            target: greenLineValue,
            current: monthValue.พฤษภาคม,
        },
        {
            month: "มิถุนายน",
            target: greenLineValue,
            current: monthValue.มิถุนายน,
        },
        {
            month: "กรกฎาคม",
            target: greenLineValue,
            current: monthValue.กรกฎาคม,
        },
        {
            month: "สิงหาคม",
            target: greenLineValue,
            current: monthValue.สิงหาคม,
        },
        {
            month: "กันยายน",
            target: greenLineValue,
            current: monthValue.กันยายน,
        },
        {
            month: "ตุลาคม",
            target: greenLineValue,
            current: monthValue.ตุลาคม,
        },
        {
            month: "พฤศจิกายน",
            target: greenLineValue,
            current: monthValue.พฤศจิกายน,
        },
        {
            month: "ธันวาคม",
            target: greenLineValue,
            current: monthValue.ธันวาคม,
        }
    ];

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
            current: monthlyIssue ? monthlyIssue.filter(value => {
                const date = new Date(+value.createdAt)

                return date.getDate() === i + 1
            }).length : 0,
        })
    }

    const handleClick = useCallback(
        (_, index: number) => {
            setMonthIndex(index + 1);
        },
        [setMonthIndex]
    );

    useEffect(() => {
        if (monthValue.มกราคม >= greenLine) {
            setColorIndexZero(0);
        } else {
            setColorIndexZero(undefined);
        }

        if (monthValue.กุมภาพันธ์ >= greenLine) {
            setColorIndexOne(1);
        } else {
            setColorIndexOne(undefined);
        }

        if (monthValue.มีนาคม >= greenLine) {
            setColorIndexTwo(2);
        } else {
            setColorIndexTwo(undefined);
        }

        if (monthValue.เมษายน >= greenLine) {
            setColorIndexThree(3);
        } else {
            setColorIndexThree(undefined);
        }

        if (monthValue.พฤษภาคม >= greenLine) {
            setColorIndexFour(4);
        } else {
            setColorIndexFour(undefined);
        }

        if (monthValue.มิถุนายน >= greenLine) {
            setColorIndexFive(5);
        } else {
            setColorIndexFive(undefined);
        }

        if (monthValue.กรกฎาคม >= greenLine) {
            setColorIndexSix(6);
        } else {
            setColorIndexSix(undefined);
        }

        if (monthValue.สิงหาคม >= greenLine) {
            setColorIndexSeven(7);
        } else {
            setColorIndexSeven(undefined);
        }

        if (monthValue.กันยายน >= greenLine) {
            setColorIndexEight(8);
        } else {
            setColorIndexEight(undefined);
        }

        if (monthValue.ตุลาคม >= greenLine) {
            setColorIndexNine(9);
        } else {
            setColorIndexNine(undefined);
        }

        if (monthValue.พฤศจิกายน >= greenLine) {
            setColorIndexTen(10);
        } else {
            setColorIndexTen(undefined);
        }

        if (monthValue.ธันวาคม >= greenLine) {
            setColorIndexEleven(11);
        } else {
            setColorIndexEleven(undefined);
        }

    }, [greenLine, monthValue]);

    const onMouseOver = (_: any, index: number) => setOnMouseIndex(index)

    return (
        <>
            <Box p="2" h="300px" mt='3' rounded="7px" boxShadow="md" borderWidth='1px'>  
                <Text
                    mt="2"
                    align='center'
                    fontSize="2xl"
                >
                    มูลค่า Issue ในแต่ละเดือน
                </Text>
                <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart
                        width={500}
                        height={300}
                        data={dataCh}
                        margin={{
                            top: 5,
                            right: 0,
                            left: 0,
                            bottom: 50,
                        }}
                    >
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="current" fill={colorBranch} onMouseOver={onMouseOver} onClick={handleClick}>
                            {dataCh.map((_, index) => (
                                <Cell
                                    cursor="pointer"
                                    fill={
                                        index === onMouseIndex
                                            ? colorOnMouse
                                            : index === colorIndexZero
                                                ? colorBranchPass
                                                : index === colorIndexOne
                                                    ? colorBranchPass
                                                    : index === colorIndexTwo
                                                        ? colorBranchPass
                                                        : index === colorIndexThree
                                                            ? colorBranchPass
                                                            : index === colorIndexFour
                                                                ? colorBranchPass
                                                                : index === colorIndexFive
                                                                    ? colorBranchPass
                                                                    : index === colorIndexSix
                                                                        ? colorBranchPass
                                                                        : index === colorIndexSeven
                                                                            ? colorBranchPass
                                                                            : index === colorIndexEight
                                                                                ? colorBranchPass
                                                                                : index === colorIndexNine
                                                                                    ? colorBranchPass
                                                                                    : index === colorIndexTen
                                                                                        ? colorBranchPass
                                                                                        : index === colorIndexEleven
                                                                                            ? colorBranchPass
                                                                                            : colorBranch
                                    }
                                    key={`cell-${index}`}
                                />
                            ))}
                        </Bar>
                        <Line type="monotone" dataKey="target" stroke="#3ae723" />
                    </ComposedChart>
                </ResponsiveContainer>
            </Box>
            <Flex flexDir={["column","column","column","column","column","row"]}>
                <Box 
                    w="100%"
                    h="300px" 
                    mt='3' 
                    rounded="7px" 
                    boxShadow="md" 
                    borderWidth='1px'
                >
                    <Text
                        mt="2"
                        align='center'
                        fontSize="2xl"
                    >
                        จำนวน Issue ในแต่ละเดือน
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
                            <Bar dataKey="current" fill={colorBranch} onMouseOver={onMouseOver} onClick={handleClick}>
                                {dataDate.map((_, index) => (
                                    <Cell key={`cell-${index}`} />
                                ))}
                            </Bar>
                            <Line type="monotone" dataKey="target" stroke="#3ae723" />
                        </ComposedChart>
                    </ResponsiveContainer>
                </Box>
                <VisitChart 
                    colorBranch={colorBranch}
                    countVisit={countVisit}      
                    monthlyVisit={monthlyVisit}
                />
            </Flex>
        </>
    )
}

export default IssueChart