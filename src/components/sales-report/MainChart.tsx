import React, { useCallback, useState, useEffect } from "react";
import { Box } from "@chakra-ui/react";
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

    const handleClick = useCallback(
        (_, index: number) => {
            setTeam(dataCh[index].name)
            setActiveIndex(index);
        },
        [setActiveIndex, setTeam]
    );

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

    return (
        <Box
            ml="5"
            p="5"
            w="40%"
            h="200px"
            rounded="7px"
            boxShadow="md"
        >
            {/* <Box w="90%" h="80%" mt="10"> */}
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
                    <CartesianGrid strokeDasharray="2 8" />
                    <XAxis dataKey="name" />
                    {/* <YAxis /> */}
                    <Tooltip />

                    <Bar dataKey="action" onClick={handleClick}>
                        {dataCh.map((_, index) => (
                            <Cell
                                stroke={index === activeIndex ? "#ff0000" : colorBranch}
                                cursor="pointer"
                                fill={
                                    index === colorIndexCuttingTwo
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
