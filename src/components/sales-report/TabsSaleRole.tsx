import React from 'react'
import {
    Flex, Text, Table, Tbody, Th, Thead, Tr,
    Td, Center, Tabs, TabList, TabPanels, Tab, TabPanel,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

import { formatDateNew, formatAmount } from "../../utils/helpers";
import { RegularSalesVisitFragment, IssueByRoleIdQuery, QuotationByRoleIdQuery } from '../../generated/graphql';

interface Props {
    color: string
    issues: IssueByRoleIdQuery | undefined
    monthlyVisit: RegularSalesVisitFragment[] | undefined
    quotations: QuotationByRoleIdQuery | undefined
}

const TabsSaleRole: React.FC<Props> = ({ color, issues, monthlyVisit, quotations }) => {

    const history = useHistory();

    return (
        <Tabs mt="5" variant="enclosed" w="100%">
            <TabList>
                <Tab fontWeight="bold">Issue</Tab>
                <Tab fontWeight="bold">การเข้าพบลูกค้า</Tab>
                <Tab fontWeight="bold">Quotation</Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                    <Flex>
                        <Text ml="6" fontWeight="bold" fontSize="xl">
                            {" "}
                            Issue ทั้งหมด
                        </Text>
                    </Flex>
                    <Table
                        boxShadow="base"
                        variant="simple"
                        colorScheme="blackAlpha"
                    >
                        <Thead>
                            <Tr bg={color}>
                                <Th
                                    textAlign="center"
                                    fontSize={["xs", "xs", "sm", "md"]}
                                    color="white"
                                >
                                    วันที่ไปพบลูกค้า
                                </Th>
                                <Th
                                    textAlign="center"
                                    fontSize={["xs", "xs", "sm", "md"]}
                                    color="white"
                                >
                                    Sale Name
                                </Th>
                                <Th
                                    textAlign="center"
                                    fontSize={["xs", "xs", "sm", "md"]}
                                    color="white"
                                >
                                    Company
                                </Th>
                                <Th
                                    textAlign="center"
                                    fontSize={["xs", "xs", "sm", "md"]}
                                    color="white"
                                >
                                    Detail
                                </Th>
                                <Th
                                    textAlign="center"
                                    fontSize={["xs", "xs", "sm", "md"]}
                                    color="white"
                                >
                                    Status
                                </Th>
                                <Th
                                    textAlign="center"
                                    fontSize={["xs", "xs", "sm", "md"]}
                                    color="white"
                                >
                                    Value
                                </Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {issues?.issueByRoleId && issues.issueByRoleId.map((val, i) => (
                                <Tr
                                    key={i}
                                    cursor="pointer"
                                    _hover={{ bg: '#eee' }}
                                    onClick={() =>
                                        history.push(`/sales-report/issue/${val.id}`)
                                    }
                                >
                                    <Td w="20%">
                                        <Flex flexDir="column">
                                            <Center>{formatDateNew(+val.createdAt)}</Center>
                                        </Flex>
                                    </Td>
                                    <Td w="15%">
                                        <Center>{val.saleName}</Center>
                                    </Td>
                                    <Td w="15%">
                                        <Center>{val.customer}</Center>
                                    </Td>
                                    <Td w="30%">{val.detail}</Td>
                                    <Td w="5%" color="cyan.600">
                                        {val.status}
                                    </Td>
                                    <Td w="15%">
                                        <Center>{formatAmount(val.issueValue)}</Center>
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TabPanel>
                <TabPanel>
                    <Flex>
                        <Text ml="6" fontWeight="bold" fontSize="xl">
                            {" "}
                            ประวัติการเข้าพบลูกค้าทั้งหมด
                        </Text>
                    </Flex>
                    {/* {actualSum?.length === 0 || !actualSum ? (
                                <Flex>
                                    <Text ml="6" fontWeight="bold" fontSize="xl">
                                        ยังไม่มีข้อมูล
                                    </Text>
                                </Flex>
                            ) : (
                                <Flex>
                                    <Text ml="6" fontWeight="bold" fontSize="xl">
                                        {" "}
                                        ประวัติการกรอก Issue ของทั้งหมด
                                    </Text>
                                    <Text
                                        ml="2"
                                        fontWeight="bold"
                                        fontSize="xl"
                                        color="blue.500"
                                    >
                                        {formatAmount(actualSum.reduce(reducer))}
                                    </Text>
                                </Flex>
                            )} */}
                    <Table
                        boxShadow="base"
                        variant="simple"
                        colorScheme="blackAlpha"
                    >
                        <Thead>
                            <Tr bg={color}>
                                <Th
                                    textAlign="center"
                                    fontSize={["xs", "xs", "sm", "md"]}
                                    color="white"
                                >
                                    วันที่ไปพบลูกค้า
                                </Th>
                                <Th
                                    textAlign="center"
                                    fontSize={["xs", "xs", "sm", "md"]}
                                    color="white"
                                >
                                    SALE NAME
                                </Th>
                                <Th
                                    textAlign="center"
                                    fontSize={["xs", "xs", "sm", "md"]}
                                    color="white"
                                >
                                    COMPANY
                                </Th>
                                <Th
                                    textAlign="center"
                                    fontSize={["xs", "xs", "sm", "md"]}
                                    color="white"
                                >
                                    jobPurpose
                                </Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {monthlyVisit && monthlyVisit.map((val, i) => (
                                <Tr
                                    key={i}
                                    cursor="pointer"
                                    _hover={{ bg: '#eee' }}
                                    onClick={() =>
                                        history.push(`/sales-report/visit/${val.id}`)
                                    }
                                >
                                    <Td>
                                        <Center>{val.visitDate}</Center>
                                    </Td>
                                    <Td>
                                        <Center>{val.saleName}</Center>
                                    </Td>
                                    <Td>{val.customer}</Td>
                                    <Td><Center>{val.jobPurpose}</Center></Td>
                                    {/* <Td w="10%">
                                                <Center>{formatAmount(val.actual)}</Center>
                                            </Td> */}
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TabPanel>
                <TabPanel>
                    <Flex>
                        <Text ml="6" fontWeight="bold" fontSize="xl">
                            {" "}
                            Quotation ทั้งหมด
                        </Text>
                    </Flex>
                    <Table
                        boxShadow="base"
                        variant="simple"
                        colorScheme="blackAlpha"
                    >
                        <Thead>
                            <Tr bg={color}>
                                <Th
                                    textAlign="center"
                                    fontSize={["xs", "xs", "sm", "md"]}
                                    color="white"
                                >
                                    วันที่ไปพบลูกค้า
                                </Th>
                                <Th
                                    textAlign="center"
                                    fontSize={["xs", "xs", "sm", "md"]}
                                    color="white"
                                >
                                    เลขที่ใบเสนอราคา
                                </Th>
                                <Th
                                    textAlign="center"
                                    fontSize={["xs", "xs", "sm", "md"]}
                                    color="white"
                                >
                                    Company
                                </Th>
                                <Th
                                    textAlign="center"
                                    fontSize={["xs", "xs", "sm", "md"]}
                                    color="white"
                                >
                                    Value
                                </Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {quotations?.quotationByRoleId && quotations?.quotationByRoleId.map((val, i) => (
                                <Tr
                                    key={i}
                                    cursor="pointer"
                                    _hover={{ bg: '#eee' }}
                                    onClick={() =>
                                        history.push(`/sales-report/visit/${val.visit.id}`)
                                    }
                                >
                                    <Td w="25%">
                                        <Flex flexDir="column">
                                            <Center>{val.visit.visitDate}</Center>
                                        </Flex>
                                    </Td>
                                    <Td w="25%">
                                        <Center>{val.quotationCode}</Center>
                                    </Td>
                                    <Td w="25%">
                                        <Center>{val.visit.customer}</Center>
                                    </Td>
                                    <Td w="25%">
                                        <Center>{formatAmount(val.value)}</Center>
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TabPanel>
            </TabPanels>
        </Tabs>
    )
}

export default TabsSaleRole