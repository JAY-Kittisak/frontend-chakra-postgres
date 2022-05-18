import React, { useState, useEffect, useCallback } from 'react'
import { Box, Text } from '@chakra-ui/react'
import {
    Bar,
    // Line,
    Cell,
    XAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    ComposedChart,
} from "recharts";

import { RegularSalesRoleFragment } from '../../generated/graphql'
import { reducer } from '../../utils/helpers'

interface Props {
    salesChannel: RegularSalesRoleFragment[] | undefined
    colorBranch: string;
    setSalesChannel: React.Dispatch<React.SetStateAction<RegularSalesRoleFragment[] | undefined>>
}

const MainChartTest: React.FC<Props> = ({ salesChannel, colorBranch, setSalesChannel }) => {
    const [channels, setChannels] = useState(['All']);
    const [dataByChannel, setDataByChannel] = useState<{
        channel: string;
        sumIssue: number;
    }[]>()

    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [channel, setChannel] = useState("All")

    const handleClick = useCallback(
        (_, index: number) => {
            if (!salesChannel) return

            if (index === activeIndex) {
                setActiveIndex(null);
                setChannel('All')
                setSalesChannel(salesChannel)
            } else {
                setActiveIndex(index);
                setChannel(channels[index+1])
                const filteredData = salesChannel.filter(item => item.channel === channels[index+1]);
                setSalesChannel(filteredData)
            }
        },
        [setActiveIndex,setSalesChannel, activeIndex, salesChannel, channels]
    );

    useEffect(() => {
        if (!salesChannel) return

        const mapChannel = salesChannel.map(item => item.channel)

        const newSetChannel = new Set(mapChannel)
        
        let items: string[] = ['All']
        newSetChannel.forEach(function (value) {
            items.push(value)
        });

        let issueChannel: { channel: string, sumIssue: number }[] = []

        items.forEach(item => {
            if (item === 'All') return

            const response = salesChannel.filter(val => val.channel === item);
            const issues = response.map(val => val.issues)

            let sumIssue: number[] = []

            issues.forEach(issue => {
                const valueIssue = issue.map(issueVal => issueVal.issueValue)
                if (valueIssue.length > 0) {
                    sumIssue.push(valueIssue.reduce(reducer))
                }
            })

            if (sumIssue.length > 0) {
                issueChannel.push({ channel: item, sumIssue: sumIssue.reduce(reducer) })
            } else {
                issueChannel.push({ channel: item, sumIssue: 0 })
            }
        })

        setDataByChannel(issueChannel)

        setChannels(items)
    }, [salesChannel])

    return (
        <>
            {dataByChannel && (
                <Box
                    ml="3"
                    p="5"
                    w="40%"
                    h="230px"
                    rounded="7px"
                    boxShadow="md"
                >
                    <Text align="center" mt="-3" mb="1" fontWeight="bold" fontSize="xl">{channel}</Text>
                    <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart
                            width={500}
                            height={300}
                            data={dataByChannel}
                            margin={{
                                top: 5,
                                right: 0,
                                left: 0,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="0 1" />
                            <XAxis dataKey="channel" />
                            <Tooltip />

                            <Bar dataKey="sumIssue" fill={colorBranch} onClick={handleClick}>
                                {dataByChannel.map((_, index) => (
                                    <Cell
                                        // stroke={index === activeIndex ? "#ff0000" : colorBranch}
                                        cursor="pointer"
                                        // fill={index === colorIndexCuttingTwo
                                        //         ? colorBranchPass
                                        //         : index === colorIndexCuttingOne
                                        //             ? colorBranchPass
                                        //             : index === colorIndexArea
                                        //                 ? colorBranchPass
                                        //                 : index === colorIndexRegion
                                        //                     ? colorBranchPass
                                        //                     : index === colorIndexProject
                                        //                         ? colorBranchPass
                                        //                         : colorBranch
                                        // }
                                        key={`cell-${index}`}
                                    />
                                ))}
                            </Bar>
                            {/* <Line type="monotone" dataKey="quota" stroke="#bd1717" /> */}
                        </ComposedChart>
                    </ResponsiveContainer>
                </Box>
            )}
        </>
    )
}

export default MainChartTest