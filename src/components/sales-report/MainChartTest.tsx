import React, { useState, useEffect, useCallback } from 'react'
import { Flex, Box, Text, Button } from '@chakra-ui/react'
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
import { CSVLink } from "react-csv";

import { RegularSalesRoleFragment, useIssueByRoleIdQuery } from '../../generated/graphql'
import { reducer, formatDateNew } from '../../utils/helpers'

interface Props {
    salesChannel: RegularSalesRoleFragment[] | undefined
    colorBranch: string;
    setSalesChannel: React.Dispatch<React.SetStateAction<RegularSalesRoleFragment[] | undefined>>
}

type ExportItemCSV = {
    id: number
    saleName: string
    detail: string
    issueValue: number
    forecastDate: string
    brand: string
    category: string
    units: number
    model: string
    size: string
    status: string
    rate: string
    closedDate: string
    closedStatus: string
    failReason: string
    createdAt: string
    updatedAt: string
    saleRole?: string
    channel?: string
    visitId?: number
    visitDate?: string
    contactName?: string
    customerType?: string
    customer?: string
    position?: string
    department?: string
    jobPurpose?: string
    visitCreatedAt?: string
};

const headers = [
    { label: "ID", key: "id" },
    { label: "SaleName", key: "saleName" },
    { label: "Detail", key: "detail" },
    { label: "IssueValue", key: "issueValue" },
    { label: "ForecastDate", key: "forecastDate" },
    { label: "Brand", key: "brand" },
    { label: "Category", key: "category" },
    { label: "Units", key: "units" },
    { label: "Model", key: "model" },
    { label: "Size", key: "size" },
    { label: "Status", key: "status" },
    { label: "Rate", key: "rate" },
    { label: "ClosedDate", key: "closedDate" },
    { label: "ClosedStatus", key: "closedStatus" },
    { label: "FailReason", key: "failReason" },
    { label: "CreatedAt", key: "createdAt" },
    { label: "UpdatedAt", key: "updatedAt" },
    { label: "SaleRole", key: "saleRole" },
    { label: "Channel", key: "channel" },
    { label: "VisitId", key: "visitId" },
    { label: "Customer", key: "customer" },
    { label: "VisitDate", key: "visitDate" },
    { label: "ContactName", key: "contactName" },
    { label: "CustomerType", key: "customerType" },
    { label: "Position", key: "position" },
    { label: "Department", key: "department" },
    { label: "JobPurpose", key: "jobPurpose" },
    { label: "VisitCreatedAt", key: "visitCreatedAt" },
];


const MainChartTest: React.FC<Props> = ({ salesChannel, colorBranch, setSalesChannel }) => {
    const [channels, setChannels] = useState(['All']);
    const [dataByChannel, setDataByChannel] = useState<{
        channel: string;
        sumIssue: number;
    }[]>()

    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [channel, setChannel] = useState("All")

    const [item, setItem] = useState<ExportItemCSV[]>([]);
    const [timeNow, setTimeNow] = useState("");

    const [{ data }] =useIssueByRoleIdQuery({ 
        variables : {saleRoleId: 2}
    })

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
    
    const csvReport = {
        filename: `Resell_Report${timeNow}.csv`,
        headers: headers,
        data: item,
    };

    const setTimeOnClick = () => {
        const dateNow = new Date()
        const hours = dateNow.getHours()
        const minutes = dateNow.getMinutes()
        const seconds = dateNow.getSeconds()
        setTimeNow(`_วันที่_${dateNow.toLocaleDateString()}_เวลา_${hours}_${minutes}_${seconds}`)
    }

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

    useEffect(() => {
        if (!data?.issueByRoleId) return

        setItem([]);

        const filterData = data.issueByRoleId.filter(val => val.saleRole.channel === channel)
    
        console.log('response',filterData)

        filterData.forEach(val => {
            const {
                id,
                saleName,
                detail,
                issueValue,
                forecastDate,
                brand,
                category,
                units,
                model,
                size,
                status,
                rate,
                closedDate,
                closedStatus,
                failReason,
                createdAt,
                updatedAt,
            } = val

            if (!val.visitLoaders) {
                setItem((arr) => [
                    ...arr,
                    {
                        id,
                        saleName,
                        detail,
                        issueValue,
                        forecastDate,
                        brand,
                        category,
                        units,
                        model,
                        size,
                        status,
                        rate,
                        closedDate,
                        closedStatus,
                        failReason,
                        createdAt: formatDateNew(+createdAt),
                        updatedAt: formatDateNew(+updatedAt),
                        saleRole: val.saleRole.salesRole,
                        channel: val.saleRole.channel,
                    },
                ])
            } else {
                val.visitLoaders.forEach(visit => {
                    setItem((arr) => [
                        ...arr,
                        {
                            id,
                            saleName,
                            detail,
                            issueValue,
                            forecastDate,
                            brand,
                            category,
                            units,
                            model,
                            size,
                            status,
                            rate,
                            closedDate,
                            closedStatus,
                            failReason,
                            createdAt: formatDateNew(+createdAt),
                            updatedAt: formatDateNew(+updatedAt),
                            saleRole: val.saleRole.salesRole,
                            channel: val.saleRole.channel,
                            visitId: visit.id,
                            visitDate: visit.visitDate,
                            contactName: visit.contactName,
                            customer: visit.customer,
                            customerType : visit.customerType,
                            position: visit.position,
                            department: visit.department,
                            jobPurpose: visit.jobPurpose,
                            visitCreatedAt: formatDateNew(+visit.createdAt),
                        },
                    ])
                })
            }
        })
    }, [data, channel])

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
                    <Flex justifyContent='center'>
                        <Text fontWeight="bold" fontSize="xl">{channel}</Text>
                        {channel !== 'All' && (
                            <CSVLink {...csvReport}>
                                <Button
                                    mt="1"
                                    ml="2"
                                    size='xs'
                                    colorScheme="teal"
                                    variant="outline"
                                    onClick={setTimeOnClick}
                                >
                                    Export to CSV
                                </Button>
                            </CSVLink>
                        )}
                    </Flex>
                    <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart
                            width={500}
                            height={300}
                            data={dataByChannel}
                            margin={{
                                top: 0,
                                right: 0,
                                left: 0,
                                bottom: 10,
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