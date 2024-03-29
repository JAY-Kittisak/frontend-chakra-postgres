import React, { useState, useEffect} from 'react'
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

import { useActualByDateQuery, RegularSalesTargetFragment } from '../../generated/graphql'
import { CatUserRole, reducer } from '../../utils/helpers'
import Spinner from '../Spinner'

 interface Props {
    colorBranch: string
    dateBegin: string
    dateEnd: string
    branch: CatUserRole
    channel: string
    targets: RegularSalesTargetFragment[] | undefined
}

type DataSales = {
    sales: string
    value: number
    strategy: number
}

const initialDataTest: DataSales = {
    sales: "initial",
    value: 0,
    strategy: 0
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

const ActualChart: React.FC<Props> = ({
    colorBranch,
    dateBegin,
    dateEnd,
    branch,
    channel,
    targets
}) => {
    const [dataSales, setDataSales] = useState<DataSales[]>([initialDataTest])

    const [{ data, fetching }] = useActualByDateQuery({
        variables: {
            dateBegin,
            dateEnd
        }
    })

    useEffect(() => {
        if (!data?.actualByDate) return
        if (!targets) return
        
        let result: DataSales[] = []

        const filterBranch = data.actualByDate.filter(val => val.salesRole.branch === branch)

        if (channel === 'All') {
            const mapRole = filterBranch.map(val => val.salesRole.salesRole)
            const newSetRole = new Set(mapRole)
            const roles = Array.from(newSetRole)
    
            roles.forEach(role => { 
                const targetRole = targets.filter(target => target.sale.salesRole === role)
                const sumTarget = targetRole.map(target => target.strategy).reduce(reducer, 0)
                const targetInMonth = sumTarget / 12
                const strategy = +targetInMonth.toFixed(0)

                const filterRole = filterBranch.filter(item => item.salesRole.salesRole === role)
                const mapIssues = filterRole.map(item => item.actual)
    
                result.push({ sales: role, value: mapIssues.reduce(reducer, 0), strategy})
            })
        } else {
            const filteredChannel = filterBranch.filter(item => item.salesRole.channel === channel)

            const mapRole = filteredChannel.map(val => val.salesRole.salesRole)
            const newSetRole = new Set(mapRole)
            const roles = Array.from(newSetRole)
    
            roles.forEach(role => { 
                const targetRole = targets.filter(target => target.sale.salesRole === role)
                const sumTarget = targetRole.map(target => target.strategy).reduce(reducer, 0)
                const targetInMonth = sumTarget / 12
                const strategy = +targetInMonth.toFixed(0)

                const filterRole = filteredChannel.filter(item => item.salesRole.salesRole === role)
                const mapIssues = filterRole.map(item => item.actual)
    
                result.push({ sales: role, value: mapIssues.reduce(reducer, 0), strategy})
            })
        }


        setDataSales(result.sort(sortDataSa))

    }, [data, branch, channel, targets])

    return (
        <Box
            mt="3"
            mb="5"
            pt="5"
            pr="6"
            h={["250px", "250px", "250px", "250px", "250px", "330px"]}
            rounded="7px"
            boxShadow="md"
            borderWidth='1px'
        >
            <Flex justifyContent='center'>
                <Text fontWeight="bold" fontSize="xl">
                    ยอดขาย Salse
                </Text>
            </Flex>
        {fetching ? (
            <Flex alignItems='center' justify="center" align="center">
                <Spinner color="grey" height={50} width={50} />
            </Flex>
        ) : (
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

                    <Bar dataKey="value" fill={colorBranch}>
                        {dataSales.map((_, index) => (
                            <Cell key={`cell-${index}`}/>
                        ))}
                    </Bar>
                    <Line type="monotone" dataKey="strategy" stroke="#bd1717" /> 
                </ComposedChart>
            </ResponsiveContainer>
            )}
        </Box>
    )
}

export default ActualChart