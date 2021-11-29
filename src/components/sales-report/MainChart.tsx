import React, { useCallback, useState, useEffect } from "react";
import { Box, Text } from "@chakra-ui/react";
import {
    Bar,
    Line,
    Cell,
    XAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    ComposedChart,
} from "recharts";

interface Props {
    colorBranch: string;
    colorBranchPass: string;
    setTeam: React.Dispatch<React.SetStateAction<string>>
}

const MainChart: React.FC<Props> = ({ colorBranch, colorBranchPass, setTeam }) => {
    const [activeIndex, setActiveIndex] = useState(0);
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

    const cuttingOneQuota = 100_000;
    const cuttingOneDate = 80_000;
    const cuttingTwoQuota = 120_000;
    const cuttingTwoDate = 180_000;
    const areaQuota = 200_000;
    const areaDate = 150_000;
    const regionQuota = 180_000;
    const regionDate = 190_000;
    const projectQuota = 160_000;
    const projectDate = 100_000;

    const dataCh = [
        {
            name: "Cutting 1",
            quota: cuttingOneQuota,
            action: cuttingOneDate,
        },
        {
            name: "Cutting 2",
            quota: cuttingTwoQuota,
            action: cuttingTwoDate,
        },
        {
            name: "Area",
            quota: areaQuota,
            action: areaDate,
        },
        {
            name: "Region",
            quota: regionQuota,
            action: regionDate,
        },
        {
            name: "Project",
            quota: projectQuota,
            action: projectDate,
        },
    ];
    const Channel = dataCh[activeIndex].name

    const handleClick = useCallback(
        (_, index: number) => {
            setActiveIndex(index);
        },
        [setActiveIndex]
    );

    useEffect(() => {
        if (activeIndex >= 0) {
            setTeam(Channel)
        }
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
        activeIndex,
        Channel,
        setTeam
    ]);

    return (
        <Box
            mx="2"
            p="5"
            w="40%"
            h="230px"
            rounded="7px"
            boxShadow="md"
        >
            <Text align="center" mt="-3" mb="1" fontWeight="bold" fontSize="xl">Channel All</Text>
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
                    <CartesianGrid strokeDasharray="0 1" />
                    <XAxis dataKey="name" />
                    <Tooltip />

                    <Bar dataKey="action" fill={colorBranch} onClick={handleClick}>
                        {dataCh.map((_, index) => (
                            <Cell
                                stroke={index === activeIndex ? "#ff0000" : colorBranch}
                                cursor="pointer"
                                fill={index === colorIndexCuttingTwo
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
    );
};

export default MainChart;
