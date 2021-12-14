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
    const cuttingOneQuotaLine2 = 25_000;
    const cuttingOneQuotaLine3 = 30_000;
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
            name: "มกราคม",
            quota: cuttingOneQuota,
            quotaLine2: cuttingOneQuotaLine2,
            quotaLine3: cuttingOneQuotaLine3,
            action: cuttingOneDate,
        },
        {
            name: "กุมภาพันธ์",
            quota: cuttingTwoQuota,
            quotaLine2: cuttingOneQuotaLine2,
            quotaLine3: cuttingOneQuotaLine3,
            action: cuttingTwoDate,
        },
        {
            name: "มีนาคม",
            quota: areaQuota,
            quotaLine2: cuttingOneQuotaLine2,
            quotaLine3: cuttingOneQuotaLine3,
            action: areaDate,
        },
        {
            name: "เมษายน",
            quota: regionQuota,
            quotaLine2: cuttingOneQuotaLine2,
            quotaLine3: cuttingOneQuotaLine3,
            action: regionDate,
        },
        {
            name: "พฤษภาคม",
            quota: projectQuota,
            quotaLine2: cuttingOneQuotaLine2,
            quotaLine3: cuttingOneQuotaLine3,
            action: 8_000,
        },
        {
            name: "มิถุนายน",
            quota: projectQuota,
            quotaLine2: cuttingOneQuotaLine2,
            quotaLine3: cuttingOneQuotaLine3,
            action: 11_000,
        },
        {
            name: "กรกฎาคม",
            quota: projectQuota,
            quotaLine2: cuttingOneQuotaLine2,
            quotaLine3: cuttingOneQuotaLine3,
            action: 15_000,
        },
        {
            name: "สิงหาคม",
            quota: projectQuota,
            quotaLine2: cuttingOneQuotaLine2,
            quotaLine3: cuttingOneQuotaLine3,
            action: 18_000,
        },
        {
            name: "กันยายน",
            quota: cuttingOneQuota,
            quotaLine2: cuttingOneQuotaLine2,
            quotaLine3: cuttingOneQuotaLine3,
            action: cuttingOneDate,
        },
        {
            name: "ตุลาคม",
            quota: cuttingTwoQuota,
            quotaLine2: cuttingOneQuotaLine2,
            quotaLine3: cuttingOneQuotaLine3,
            action: cuttingTwoDate,
        },
        {
            name: "พฤศจิกายน",
            quota: areaQuota,
            quotaLine2: cuttingOneQuotaLine2,
            quotaLine3: cuttingOneQuotaLine3,
            action: areaDate,
        },
        {
            name: "ธันวาคม",
            quota: areaQuota,
            quotaLine2: cuttingOneQuotaLine2,
            quotaLine3: cuttingOneQuotaLine3,
            action: 18_000,
        }
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
            mr="3"
            p="2"
            paddingBottom="8"
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
                    <Line type="monotone" dataKey="quotaLine2" stroke="#d8d516" />
                    <Line type="monotone" dataKey="quotaLine3" stroke="#3ae723" />
                </ComposedChart>
            </ResponsiveContainer>
        </Box>
    )
}

export default SalesChart