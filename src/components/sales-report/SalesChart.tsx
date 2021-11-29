import React, { useState, useEffect } from 'react'
import { Box, Text } from "@chakra-ui/react";
import {
    Bar,
    Line,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    ComposedChart,
} from "recharts";

interface Props {
    colorBranch: string;
    colorBranchPass: string;
    colorOnMouse: string;
    team: string
}

const SalesChart: React.FC<Props> = ({ colorBranch, colorBranchPass, colorOnMouse, team }) => {
    const [colorIndexCuttingOne, setColorIndexCuttingOne] = useState<
        number | undefined
    >(undefined);
    const [colorIndexCuttingTwo, setColorIndexCuttingTwo] = useState<
        number | undefined
    >(undefined);
    const [colorIndexArea, setColorIndexArea] = useState<
        number | undefined
    >(undefined);
    const [colorIndexRegion, setColorIndexRegion] = useState<
        number | undefined
    >(undefined);
    const [colorIndexProject, setColorIndexProject] = useState<
        number | undefined
    >(undefined);

    const [onMouseIndex, setOnMouseIndex] = useState<number | undefined>(undefined);

    const cuttingOneQuota = 20_000;
    const cuttingOneDate = 20_000;
    const cuttingTwoQuota = 20_000;
    const cuttingTwoDate = 13_000;
    const areaQuota = 20_000;
    const areaDate = 25_000;
    const regionQuota = 20_000;
    const regionDate = 15_000;
    const projectQuota = 20_000;
    const projectDate = 10_000;

    const dataCh = [
        {
            name: "Sales1",
            quota: cuttingOneQuota,
            action: cuttingOneDate,
        },
        {
            name: "Sales2",
            quota: cuttingTwoQuota,
            action: cuttingTwoDate,
        },
        {
            name: "Sales3",
            quota: areaQuota,
            action: areaDate,
        },
        {
            name: "Sales4",
            quota: regionQuota,
            action: regionDate,
        },
        {
            name: "Sales5",
            quota: projectQuota,
            action: 8_000,
        },
        {
            name: "Sales6",
            quota: projectQuota,
            action: 11_000,
        },
        {
            name: "Sales7",
            quota: projectQuota,
            action: 15_000,
        },
        {
            name: "Sales8",
            quota: projectQuota,
            action: 18_000,
        },
        {
            name: "Sales1",
            quota: cuttingOneQuota,
            action: cuttingOneDate,
        },
        {
            name: "Sales2",
            quota: cuttingTwoQuota,
            action: cuttingTwoDate,
        },
        {
            name: "Sales3",
            quota: areaQuota,
            action: areaDate,
        },
        {
            name: "Sales4",
            quota: regionQuota,
            action: regionDate,
        },
        {
            name: "Sales5",
            quota: projectQuota,
            action: 8_000,
        },
        {
            name: "Sales6",
            quota: projectQuota,
            action: 11_000,
        },
        {
            name: "Sales7",
            quota: projectQuota,
            action: 15_000,
        },
        {
            name: "Sales8",
            quota: projectQuota,
            action: 18_000,
        },
    ];

    useEffect(() => {
        if (cuttingOneDate >= cuttingOneQuota) {
            setColorIndexCuttingOne(0);
        } else {
            setColorIndexCuttingOne(undefined);
        }

        if (cuttingTwoDate >= cuttingTwoQuota) {
            setColorIndexCuttingTwo(1);
        } else {
            setColorIndexCuttingTwo(undefined);
        }

        if (areaDate >= areaQuota) {
            setColorIndexArea(2);
        } else {
            setColorIndexArea(undefined);
        }

        if (regionDate >= regionQuota) {
            setColorIndexRegion(3);
        } else {
            setColorIndexRegion(undefined);
        }

        if (projectDate >= projectQuota) {
            setColorIndexProject(4);
        } else {
            setColorIndexProject(undefined);
        }
    }, [
        cuttingOneQuota,
        cuttingOneDate,
        cuttingTwoQuota,
        cuttingTwoDate,
        areaQuota,
        areaDate,
        regionQuota,
        regionDate,
        projectQuota,
        projectDate,
    ]);

    const onMouseOver = (_: any, index: number) => setOnMouseIndex(index)

    return (
        <Box
            mb="2"
            ml="3"
            p="5"
            h={["250px", "250px", "250px", "250px", "250px", "330px"]}
            align="center"
        >
            <Text fontSize="2xl" fontWeight="semibold">
                ทีม {team}
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
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="1 1" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />

                    <Bar dataKey="action" fill={colorBranch} onMouseOver={onMouseOver}>
                        {dataCh.map((_, index) => (
                            <Cell
                                fill={
                                    index === onMouseIndex
                                        ? colorOnMouse
                                        : index === colorIndexCuttingTwo
                                        ? colorBranchPass
                                        : index === colorIndexCuttingOne
                                            ? colorBranchPass
                                            : index === colorIndexArea
                                                ? colorBranchPass
                                                : index === colorIndexRegion
                                                    ? colorBranchPass
                                                    : index === colorIndexProject
                                                        ? colorBranchPass
                                                        : colorBranch
                                }
                                key={`cell-${index}`}
                            />
                        ))}
                    </Bar>
                    <Line type="monotone" dataKey="quota" stroke="#bd1717" />
                </ComposedChart>
            </ResponsiveContainer>
        </Box>
    )
}

export default SalesChart