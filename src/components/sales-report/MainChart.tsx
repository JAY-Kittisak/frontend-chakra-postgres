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

import { RegularSalesVisitFragment } from '../../generated/graphql'
import { formatDateNew } from '../../utils/helpers'
import Spinner from '../Spinner';

interface Props {
    colorBranch: string
    dateBegin: string
    dateEnd: string
    channel: string
    channels: string[]
    dataByChannel: {
        channel: string;
        sumIssue: number;
    }[] | undefined
    fetching: boolean
    setChannel: React.Dispatch<React.SetStateAction<string>>
    visits: RegularSalesVisitFragment[] | undefined
}

type ExportItemCSV = {
    saleRole: string
    channel: string
    saleName: string
    visitId: number
    visitDate: string
    contactName: string
    customerType: string
    customer: string
    position: string
    department: string
    jobPurpose: string
    visitCreatedAt: string
    issueId?: number
    detail?: string
    issueValue?: number
    forecastDate?: string
    brand?: string
    category?: string
    units?: number
    model?: string
    size?: string
    status?: string
    rate?: string
    closedDate?: string
    closedStatus?: string
    failReason?: string
    issueCreatedAt?: string
    issueUpdatedAt?: string
};

const headers = [
    { label: "SaleRole", key: "saleRole" },
    { label: "Channel", key: "channel" },
    { label: "SaleName", key: "saleName" },
    { label: "VisitId", key: "visitId" },
    { label: "Customer", key: "customer" },
    { label: "VisitDate", key: "visitDate" },
    { label: "ContactName", key: "contactName" },
    { label: "CustomerType", key: "customerType" },
    { label: "Position", key: "position" },
    { label: "Department", key: "department" },
    { label: "JobPurpose", key: "jobPurpose" },
    { label: "VisitCreatedAt", key: "visitCreatedAt" },
    { label: "IssueId", key: "issueId" },
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
    { label: "IssueCreatedAt", key: "issueCreatedAt" },
    { label: "IssueUpdatedAt", key: "issueUpdatedAt" },
];

const MainChart: React.FC<Props> = ({
    colorBranch,
    channel,
    channels,
    dataByChannel,
    fetching,
    setChannel,
    visits
}) => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const [item, setItem] = useState<ExportItemCSV[]>([]);
    const [timeNow, setTimeNow] = useState("");

    const handleClick = useCallback(
        (_, index: number) => {
            if (index === activeIndex) {
                setActiveIndex(null)
                setChannel('All')
            } else {
                setActiveIndex(index)
                setChannel(channels[index + 1])
            }
        },
        [setChannel, activeIndex, channels]
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
        if (!visits) return

        setItem([]);

        visits.forEach(visit => {
            const {
                id,
                saleName,
                visitDate,
                contactName,
                customer,
                customerType,
                position,
                department,
                jobPurpose,
                createdAt,
            } = visit
            
            if (!visit.issueReceives) {
                setItem((arr) => [
                    ...arr,
                    {
                        saleRole: visit.saleRole.salesRole,
                        channel: visit.saleRole.channel,
                        saleName,
                        visitId: id,
                        visitDate,
                        contactName,
                        customer,
                        customerType,
                        position,
                        department,
                        jobPurpose,
                        visitCreatedAt: formatDateNew(+createdAt)
                    },
                ])
            } else {
                visit.issueReceives.forEach(issue => {
                    setItem((arr) => [
                        ...arr,
                        {
                            saleRole: visit.saleRole.salesRole,
                            channel: visit.saleRole.channel,
                            saleName,
                            visitId: id,
                            visitDate,
                            contactName,
                            customer,
                            customerType,
                            position,
                            department,
                            jobPurpose,
                            visitCreatedAt: formatDateNew(+createdAt),
                            issueId: issue.id,
                            detail: issue.detail,
                            issueValue: issue.issueValue,
                            forecastDate: issue.forecastDate,
                            brand: issue.brand,
                            category: issue.category,
                            units: issue.units,
                            model: issue.model,
                            size: issue.size,
                            status: issue.status,
                            rate: issue.rate,
                            closedDate: issue.closedDate,
                            closedStatus: issue.closedStatus,
                            failReason: issue.failReason,
                            issueCreatedAt: formatDateNew(+issue.createdAt),
                            issueUpdatedAt: formatDateNew(+issue.updatedAt),
                        },
                    ])
                })
            }
        })

    }, [visits])

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
                    {fetching ? (
                        <Flex alignItems='center' justify="center" align="center">
                            <Spinner color="grey" height={50} width={50} />
                        </Flex>
                    ) : (
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
                    )}
                </Box>
            )}
        </>
    )
}

export default MainChart