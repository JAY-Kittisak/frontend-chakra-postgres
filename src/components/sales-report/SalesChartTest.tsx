import React, { useState, useEffect } from 'react'
import { Box } from "@chakra-ui/react";
import {
    Bar,
    // Line,
    Cell,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    ComposedChart,
} from "recharts";

import { RegularSalesRoleFragment } from "../../generated/graphql";
import { reducer } from '../../utils/helpers';

interface Props {
    colorBranch: string
    salesChannel: RegularSalesRoleFragment[] | undefined
}

type DataSales = {
    sales: string;
    sumIssue: number;
}

const SalesChartTest: React.FC<Props> = ({ salesChannel, colorBranch }) => {
    const [dataSales, setDataSales] = useState<DataSales[]>()

    useEffect(() => {
        if (!salesChannel) return

        const mapSales = salesChannel.map(item => item.salesRole)

        let result: DataSales[] = []

        mapSales.forEach(role => {
            const filterSales = salesChannel.filter(item => item.salesRole === role)
            const mapIssues = filterSales.map(item => item.issues)
            
            let sumIssue: number[] = []

            mapIssues.forEach(issue => {
                const valueIssue = issue.map(issueVal => issueVal.issueValue)
                
                if (valueIssue.length > 0) {
                    sumIssue.push(valueIssue.reduce(reducer))
                }

            })

            if (sumIssue.length > 0) {
                result.push({ sales: role, sumIssue: sumIssue.reduce(reducer) })
            } else {
                result.push({ sales: role, sumIssue: 0 })
            }

        })
        
        setDataSales(result)

    }, [salesChannel])


    if (!dataSales) return (<div> No data </div>)
    else return (
        <Box
            mt="3"
            pt="5"
            pr="6"
            h={["250px", "250px", "250px", "250px", "250px", "330px"]}
            rounded="7px"
            boxShadow="md"
            borderWidth='1px'
        >
            <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                    width={500}
                    height={300}
                    data={dataSales}
                    margin={{
                        top: 5,
                        right: 0,
                        left: 20,
                        bottom: 0,
                    }}
                >
                    <XAxis dataKey="sales" />
                    <YAxis />
                    <Tooltip />

                    <Bar dataKey="sumIssue" fill={colorBranch}>
                        {dataSales.map((_, index) => (
                            <Cell
                                cursor="pointer"
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
                        <Line type="monotone" dataKey="safety_line" stroke="#3ae723" /> */}
                </ComposedChart>
            </ResponsiveContainer>
        </Box>
    )
}

export default SalesChartTest