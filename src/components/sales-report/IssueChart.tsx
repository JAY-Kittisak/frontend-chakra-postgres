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
import { selectMonth } from '../../utils/helpers';

type IssueMonth = { month: string, target: number, sumIssue: number }
type DataIssueMonth = { id: string, target: number, result: number }

interface Props {
    colorBranch: string;
    colorBranchPass: string;
    colorOnMouse: string;
    countIssue: number
    setMonthIndex: (index: number) => void | undefined
    monthIndex: number
    monthlyIssue: RegularSalesIssueFragment[] | undefined
    countVisit: number
    monthlyVisit: RegularSalesVisitFragment[] | undefined
    issueMonth: IssueMonth[] | undefined
}

const initialDataIssue: DataIssueMonth[] = [{
    id: "",
    target: 0,
    result: 0
}]
const dt = new Date();
const month = dt.getMonth();
const year = dt.getFullYear();
const daysInMonth = new Date(year, month + 1, 0).getDate();

const IssueChart: React.FC<Props> = ({
    colorBranch,
    colorBranchPass,
    colorOnMouse,
    countIssue,
    setMonthIndex,
    monthIndex,
    monthlyIssue,
    countVisit,
    monthlyVisit,
    issueMonth
}) => {
    const [colorIndex, setColorIndex] = useState<
        number | undefined
    >(undefined);

    const [onMouseIndex, setOnMouseIndex] = useState<number | undefined>(undefined);
    const [ dataIssueMonth,setDataIssueMonth] = useState(initialDataIssue)
    const greenLine = countIssue / 12
    const targetDay = Math.ceil(greenLine / daysInMonth)

    const handleClick = useCallback(
        (_, index: number) => {
            console.log(index,monthIndex)
            if (index+1 === monthIndex) {
                return setMonthIndex(0)
            }
            setMonthIndex(index + 1);
        },
        [setMonthIndex, monthIndex]
    );
    
    useEffect(() => {
        let dataDate: DataIssueMonth[] = []

        for (let i = 0; i < daysInMonth; i++) {
            dataDate.push({
                id: `${i + 1}`,
                target: targetDay,
                result: monthlyIssue ? monthlyIssue.filter(value => {
                    const date = new Date(+value.createdAt)
    
                    return date.getDate() === i + 1
                }).length : 0,
            })
        }

        setDataIssueMonth(dataDate)
    }, [ monthlyIssue, targetDay])

    useEffect(() => {
        if (!issueMonth) return

        selectMonth.forEach((element,index) => {
            if (element === "ทุกเดือน") return

            const response = issueMonth.find(value => value.month === element)

            if (response) {
                if (response.sumIssue >= greenLine) {
                    setColorIndex(index - 1);
                } else {
                    setColorIndex(undefined);
                }
            } 
        });

    }, [greenLine, issueMonth]);

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
                {!issueMonth ? (
                    <p>No Data.</p>
                ) : (
                    <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart
                            width={500}
                            height={300}
                            data={issueMonth}
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
                            <Bar dataKey="sumIssue" fill={colorBranch} onMouseOver={onMouseOver} onClick={handleClick}>
                                {issueMonth.map((_, index) => (
                                    <Cell
                                        cursor="pointer"
                                        fill={
                                            index === onMouseIndex
                                                ? colorOnMouse
                                                : index === colorIndex
                                                    ? colorBranchPass
                                                    :  colorBranch
                                        }
                                        key={`cell-${index}`}
                                    />
                                ))}
                            </Bar>
                            <Line type="monotone" dataKey="target" stroke="#3ae723" />
                        </ComposedChart>
                    </ResponsiveContainer>
                )}
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
                    <Flex
                        mt="2"
                        alignItems='center'
                        justifyContent="center"
                        fontSize="2xl"
                    >
                        จำนวน Issue เดือน <Text fontWeight="bold" color={colorBranchPass}>&nbsp;{selectMonth[monthIndex]}</Text>
                    </Flex>
                    <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart
                            width={500}
                            height={300}
                            data={dataIssueMonth}
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
                            <Bar dataKey="result" fill={colorBranch} onMouseOver={onMouseOver}>
                                {dataIssueMonth.map((_, index) => (
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
                    monthIndex={monthIndex}
                    colorBranchPass={colorBranchPass}
                />
            </Flex>
        </>
    )
}

export default IssueChart