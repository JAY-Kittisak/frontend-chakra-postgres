import React, { useState, useEffect } from 'react'
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
    team: string
    monthValue: MonthValue
}

const SalesChart: React.FC<Props> = ({ colorBranch, colorBranchPass, colorOnMouse, team, monthValue }) => {
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

    const targetKpi = 5500;
    const strategyLine = 6000;
    const safetyLine = 6500;

    const dataCh = [
        {
            name: "มกราคม",
            safety_line: safetyLine,
            Target_กลยุทธ์: strategyLine,
            Target_KPI: targetKpi,
            action: monthValue.มกราคม,
        },
        {
            name: "กุมภาพันธ์",
            safety_line: safetyLine,
            Target_กลยุทธ์: strategyLine,
            Target_KPI: targetKpi,
            action: monthValue.กุมภาพันธ์,
        },
        {
            name: "มีนาคม",
            safety_line: safetyLine,
            Target_กลยุทธ์: strategyLine,
            Target_KPI: targetKpi,
            action: monthValue.มีนาคม,
        },
        {
            name: "เมษายน",
            safety_line: safetyLine,
            Target_กลยุทธ์: strategyLine,
            Target_KPI: targetKpi,
            action: monthValue.เมษายน,
        },
        {
            name: "พฤษภาคม",
            safety_line: safetyLine,
            Target_กลยุทธ์: strategyLine,
            Target_KPI: targetKpi,
            action: monthValue.พฤษภาคม,
        },
        {
            name: "มิถุนายน",
            safety_line: safetyLine,
            Target_กลยุทธ์: strategyLine,
            Target_KPI: targetKpi,
            action: monthValue.มิถุนายน,
        },
        {
            name: "กรกฎาคม",
            safety_line: safetyLine,
            Target_กลยุทธ์: strategyLine,
            Target_KPI: targetKpi,
            action: monthValue.กรกฎาคม,
        },
        {
            name: "สิงหาคม",
            safety_line: safetyLine,
            Target_กลยุทธ์: strategyLine,
            Target_KPI: targetKpi,
            action: monthValue.สิงหาคม,
        },
        {
            name: "กันยายน",
            safety_line: safetyLine,
            Target_กลยุทธ์: strategyLine,
            Target_KPI: targetKpi,
            action: monthValue.กันยายน,
        },
        {
            name: "ตุลาคม",
            safety_line: safetyLine,
            Target_กลยุทธ์: strategyLine,
            Target_KPI: targetKpi,
            action: monthValue.ตุลาคม,
        },
        {
            name: "พฤศจิกายน",
            safety_line: safetyLine,
            Target_กลยุทธ์: strategyLine,
            Target_KPI: targetKpi,
            action: monthValue.พฤศจิกายน,
        },
        {
            name: "ธันวาคม",
            safety_line: safetyLine,
            Target_กลยุทธ์: strategyLine,
            Target_KPI: targetKpi,
            action: monthValue.ธันวาคม,
        }
    ];

    useEffect(() => {
        if (monthValue.มกราคม >= targetKpi) {
            setColorIndexZero(0);
        } else {
            setColorIndexZero(undefined);
        }

        if (monthValue.กุมภาพันธ์ >= targetKpi) {
            setColorIndexOne(1);
        } else {
            setColorIndexOne(undefined);
        }

        if (monthValue.มีนาคม >= targetKpi) {
            setColorIndexTwo(2);
        } else {
            setColorIndexTwo(undefined);
        }

        if (monthValue.เมษายน >= targetKpi) {
            setColorIndexThree(3);
        } else {
            setColorIndexThree(undefined);
        }

        if (monthValue.พฤษภาคม >= targetKpi) {
            setColorIndexFour(4);
        } else {
            setColorIndexFour(undefined);
        }

        if (monthValue.มิถุนายน >= targetKpi) {
            setColorIndexFive(5);
        } else {
            setColorIndexFive(undefined);
        }

        if (monthValue.กรกฎาคม >= targetKpi) {
            setColorIndexSix(6);
        } else {
            setColorIndexSix(undefined);
        }

        if (monthValue.สิงหาคม >= targetKpi) {
            setColorIndexSeven(7);
        } else {
            setColorIndexSeven(undefined);
        }

        if (monthValue.กันยายน >= targetKpi) {
            setColorIndexEight(8);
        } else {
            setColorIndexEight(undefined);
        }

        if (monthValue.ตุลาคม >= targetKpi) {
            setColorIndexNine(9);
        } else {
            setColorIndexNine(undefined);
        }

        if (monthValue.พฤศจิกายน >= targetKpi) {
            setColorIndexTen(10);
        } else {
            setColorIndexTen(undefined);
        }

        if (monthValue.ธันวาคม >= targetKpi) {
            setColorIndexEleven(11);
        } else {
            setColorIndexEleven(undefined);
        }

    }, [targetKpi, monthValue]);

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
                {team}
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

                    <Bar dataKey="action" fill={colorBranch} onMouseOver={onMouseOver}>
                        {dataCh.map((_, index) => (
                            <Cell
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