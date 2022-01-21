import React, { useState, useEffect, useCallback } from 'react'
import { Box, Text } from "@chakra-ui/react";
import {
    Bar,
    Line,
    Cell,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    ComposedChart,
} from "recharts";

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
    title: string
    commission: number
    strategy: number
    monthValue: MonthValue
    setMonthIndex: (index: number) => void | undefined
}

const SalesChart: React.FC<Props> = ({
    colorBranch,
    colorBranchPass,
    colorOnMouse,
    title,
    commission,
    strategy,
    monthValue,
    setMonthIndex
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

    const greenLine = strategy / 10
    const yellowLine = strategy / 12
    const redLine = commission / 12

    const dataCh = [
        {
            name: "มกราคม",
            safety_line: greenLine,
            Target_กลยุทธ์: yellowLine,
            Target_KPI: redLine,
            action: monthValue.มกราคม,
        },
        {
            name: "กุมภาพันธ์",
            safety_line: greenLine,
            Target_กลยุทธ์: yellowLine,
            Target_KPI: redLine,
            action: monthValue.กุมภาพันธ์,
        },
        {
            name: "มีนาคม",
            safety_line: greenLine,
            Target_กลยุทธ์: yellowLine,
            Target_KPI: redLine,
            action: monthValue.มีนาคม,
        },
        {
            name: "เมษายน",
            safety_line: greenLine,
            Target_กลยุทธ์: yellowLine,
            Target_KPI: redLine,
            action: monthValue.เมษายน,
        },
        {
            name: "พฤษภาคม",
            safety_line: greenLine,
            Target_กลยุทธ์: yellowLine,
            Target_KPI: redLine,
            action: monthValue.พฤษภาคม,
        },
        {
            name: "มิถุนายน",
            safety_line: greenLine,
            Target_กลยุทธ์: yellowLine,
            Target_KPI: redLine,
            action: monthValue.มิถุนายน,
        },
        {
            name: "กรกฎาคม",
            safety_line: greenLine,
            Target_กลยุทธ์: yellowLine,
            Target_KPI: redLine,
            action: monthValue.กรกฎาคม,
        },
        {
            name: "สิงหาคม",
            safety_line: greenLine,
            Target_กลยุทธ์: yellowLine,
            Target_KPI: redLine,
            action: monthValue.สิงหาคม,
        },
        {
            name: "กันยายน",
            safety_line: greenLine,
            Target_กลยุทธ์: yellowLine,
            Target_KPI: redLine,
            action: monthValue.กันยายน,
        },
        {
            name: "ตุลาคม",
            safety_line: greenLine,
            Target_กลยุทธ์: yellowLine,
            Target_KPI: redLine,
            action: monthValue.ตุลาคม,
        },
        {
            name: "พฤศจิกายน",
            safety_line: greenLine,
            Target_กลยุทธ์: yellowLine,
            Target_KPI: redLine,
            action: monthValue.พฤศจิกายน,
        },
        {
            name: "ธันวาคม",
            safety_line: greenLine,
            Target_กลยุทธ์: yellowLine,
            Target_KPI: redLine,
            action: monthValue.ธันวาคม,
        }
    ];

    const handleClick = useCallback(
        (_, index: number) => {
            setMonthIndex(index + 1);
        },
        [setMonthIndex]
    );

    useEffect(() => {
        if (monthValue.มกราคม >= yellowLine) {
            setColorIndexZero(0);
        } else {
            setColorIndexZero(undefined);
        }

        if (monthValue.กุมภาพันธ์ >= yellowLine) {
            setColorIndexOne(1);
        } else {
            setColorIndexOne(undefined);
        }

        if (monthValue.มีนาคม >= yellowLine) {
            setColorIndexTwo(2);
        } else {
            setColorIndexTwo(undefined);
        }

        if (monthValue.เมษายน >= yellowLine) {
            setColorIndexThree(3);
        } else {
            setColorIndexThree(undefined);
        }

        if (monthValue.พฤษภาคม >= yellowLine) {
            setColorIndexFour(4);
        } else {
            setColorIndexFour(undefined);
        }

        if (monthValue.มิถุนายน >= yellowLine) {
            setColorIndexFive(5);
        } else {
            setColorIndexFive(undefined);
        }

        if (monthValue.กรกฎาคม >= yellowLine) {
            setColorIndexSix(6);
        } else {
            setColorIndexSix(undefined);
        }

        if (monthValue.สิงหาคม >= yellowLine) {
            setColorIndexSeven(7);
        } else {
            setColorIndexSeven(undefined);
        }

        if (monthValue.กันยายน >= yellowLine) {
            setColorIndexEight(8);
        } else {
            setColorIndexEight(undefined);
        }

        if (monthValue.ตุลาคม >= yellowLine) {
            setColorIndexNine(9);
        } else {
            setColorIndexNine(undefined);
        }

        if (monthValue.พฤศจิกายน >= yellowLine) {
            setColorIndexTen(10);
        } else {
            setColorIndexTen(undefined);
        }

        if (monthValue.ธันวาคม >= yellowLine) {
            setColorIndexEleven(11);
        } else {
            setColorIndexEleven(undefined);
        }

    }, [yellowLine, monthValue]);

    const onMouseOver = (_: any, index: number) => setOnMouseIndex(index)

    return (
        <Box
            mr="3"
            p="2"
            paddingBottom="8"
            h={["250px", "250px", "250px", "250px", "250px", "330px"]}
            align="center"
        >
            <Text fontSize="2xl" fontWeight="semibold" mb="-5">
                {title}
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
                        bottom: 0,
                    }}
                >
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />

                    <Bar dataKey="action" fill={colorBranch} onMouseOver={onMouseOver} onClick={handleClick}>
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
                    <Line type="monotone" dataKey="Target_KPI" stroke="#bd1717" />
                    <Line type="monotone" dataKey="Target_กลยุทธ์" stroke="#d8d516" />
                    <Line type="monotone" dataKey="safety_line" stroke="#3ae723" />
                </ComposedChart>
            </ResponsiveContainer>
        </Box>
    )
}

export default SalesChart