import React, { useState, useEffect } from 'react'
import { Box, Flex, Text } from "@chakra-ui/react";
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

import { RegularSalesVisitFragment, RegularSalesTargetFragment } from "../../generated/graphql";
import { reducer } from '../../utils/helpers';

interface Props {
    colorBranch: string
    visits: RegularSalesVisitFragment[] | undefined
    targets: RegularSalesTargetFragment[] | undefined
    setSumValueIssue: (value: number) => void
}

type DataSales = {
    sales: string
    sumIssue: number
    targetIssue: number
}

const sortDataSa = (a: DataSales,b: DataSales) => {
    if (a.sales < b.sales) {
        return -1;
    } else if (a.sales > b.sales) {
        return 1;
    } else {
        return 0;
    }
}

const SalesChart: React.FC<Props> = ({ 
    colorBranch, 
    visits, 
    setSumValueIssue,
    targets
}) => {
    const [dataSales, setDataSales] = useState<DataSales[]>([{
        sales: 'all',
        sumIssue: 0,
        targetIssue: 0
    }])

    useEffect(() => {
        if (!visits) return
        if (!targets) return
        
        let result: DataSales[] = []

        const mapRole = visits.map(val => val.saleRole.salesRole)
        const newSetRole = new Set(mapRole)
        const roles = Array.from(newSetRole)

        roles.forEach(role => {
            const targetRole = targets.filter(target => target.sale.salesRole === role)
            const sumTarget = targetRole.map(target => target.valueIssue).reduce(reducer, 0)
            const targetInMonth = sumTarget / 12
            const targetIssue = +targetInMonth.toFixed(0)

            const filterRole = visits.filter(item => item.saleRole.salesRole === role)
            const mapIssues = filterRole.map(item => item.issueReceives)

            let sumIssue: number[] = []

            mapIssues.forEach(issue => {
                if (!issue) return 

                const valueIssue = issue.map(issueVal => issueVal.issueValue)
                sumIssue.push(valueIssue.reduce(reducer, 0))
            })

            result.push({ sales: role, sumIssue: sumIssue.reduce(reducer, 0), targetIssue})
        })
        
        setDataSales(result.sort(sortDataSa))

        setSumValueIssue(result.map(val => val.sumIssue).reduce(reducer, 0))

    }, [visits, setSumValueIssue, targets])

    return (
        <Box
            mt="3"
            pt="5"
            pr="6"
            h={["250px", "250px", "250px", "250px", "250px", "330px"]}
            rounded="7px"
            boxShadow="md"
            borderWidth='1px'
        >
        <Flex justifyContent='center'>
            <Text fontWeight="bold" fontSize="xl">
                มูลค่า Issue
            </Text>
        </Flex>
            <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                    width={500}
                    height={300}
                    data={dataSales}
                    margin={{
                        top: 5,
                        right: 0,
                        left: 20,
                        bottom: 30,
                    }}
                >
                    <XAxis dataKey="sales" />
                    <YAxis />
                    <Tooltip />

                    <Bar dataKey="sumIssue" fill={colorBranch}>
                        {dataSales.map((_, index) => (
                            <Cell
                                // fill={
                                //     index === onMouseIndex
                                //         ? colorOnMouse
                                //         : index === colorIndexZero
                                //             ? colorBranchPass
                                //             : index === colorIndexOne
                                //             ? colorBranchPass
                                //                 : index === colorIndexTwo
                                //                     ? colorBranchPass
                                //                     : index === colorIndexThree
                                //                     ? colorBranchPass
                                //                         : index === colorIndexFour
                                //                             ? colorBranchPass
                                //                             : index === colorIndexFive
                                //                                 ? colorBranchPass
                                //                                 : index === colorIndexSix
                                //                                     ? colorBranchPass
                                //                                     : index === colorIndexSeven
                                //                                         ? colorBranchPass
                                //                                         : index === colorIndexEight
                                //                                             ? colorBranchPass
                                //                                             : index === colorIndexNine
                                //                                                 ? colorBranchPass
                                //                                                 : index === colorIndexTen
                                //                                                     ? colorBranchPass
                                //                                                     : index === colorIndexEleven
                                //                                                         ? colorBranchPass
                                //                                                         : colorBranch
                                // }
                                key={`cell-${index}`}
                            />
                        ))}
                    </Bar>
                    {/* <Line type="monotone" dataKey="Target_KPI" stroke="#bd1717" />
                        <Line type="monotone" dataKey="Target_กลยุทธ์" stroke="#d8d516" />
                        <Line type="monotone" dataKey="targetIssue" stroke="#3ae723" /> */}
                        <Line type="monotone" dataKey="targetIssue" stroke="#bd1717" /> 
                </ComposedChart>
            </ResponsiveContainer>
        </Box>
    )
}

export default SalesChart