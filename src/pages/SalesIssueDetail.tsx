import React from "react";
import {
    Flex, Text, Divider, Stack, Button,
    TableContainer, Table, Center, Thead, Tbody, Tr, Th,
    Td, TableCaption, Heading, Box, Grid
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { useParams, useHistory } from "react-router-dom";
import { useIssueByIdQuery } from "../generated/graphql";

import { formatAmount, formatDateNew } from "../utils/helpers";
import Spinner from "../components/Spinner";
import { useIsAuth } from "../utils/uselsAuth";
import SalesUpdateIssue from '../components/sales-report/SalesUpdateIssue'
import { useDialog } from "../components/dialogs/useDialog";

interface Props { }

const SalesIssueDetail: React.FC<Props> = () => {
    useIsAuth();

    const params = useParams<{ id: string }>();
    const history = useHistory();

    const { isOpen, setIsOpen } = useDialog();

    const [{ data, fetching }] = useIssueByIdQuery({
        variables: {
            id: +params.id,
        },
    });

    return (
        <Flex flexDir="column" p="5" pb="10" overflow="auto" h="96vh">
            <Text
                as="i"
                fontWeight="semibold"
                fontSize={["md", "md", "xl", "3xl"]}
                color="gray.600"
            >
                Issue Detail
            </Text>
            <Divider mt={1} mb={1} orientation="horizontal" />
            <Flex justify="center">
                {!data?.issueById || fetching ? (
                    <Flex justify="center" mt="5">
                        <Spinner color="grey" height={50} width={50} />
                        <Text fontWeight="bold" fontSize="2xl">
                            &nbsp; Loading... or No data.
                        </Text>
                    </Flex>
                ) : (
                    <Flex flexDir="column" w="100%" align="center">
                        <Flex 
                            flexDir="column"
                            w="100%"
                            p="6"
                            mt="2"
                            shadow='md'
                            borderWidth='1px'
                            borderRadius='md'
                        >
                            <Flex>
                                <Text
                                    fontSize="lg"
                                    fontWeight="semibold"
                                >
                                    Code : &nbsp;
                                </Text>
                                <Text fontSize="lg">
                                    {data.issueById.saleRole.salesRole} &nbsp;
                                </Text>
                                <Text
                                    fontSize="lg"
                                    fontWeight="semibold"
                                >
                                    ชื่อ : &nbsp;
                                </Text>
                                <Text fontSize="lg">
                                    {data.issueById.saleName} &nbsp;
                                </Text>
                                <Text
                                    fontSize="lg"
                                    fontWeight="semibold"
                                >
                                    สาขา : &nbsp;
                                </Text>
                                <Text fontSize="lg">
                                    {data.issueById.saleRole.branch}
                                </Text>
                            </Flex>
                            <Flex mt="1">
                                <Text
                                    fontSize="lg"
                                    fontWeight="semibold"
                                >
                                    วันที่คาดว่าจะปิดงาน : &nbsp;
                                </Text>
                                <Text fontSize="lg">
                                    {formatDateNew(data.issueById.forecastDate)}
                                </Text>
                            </Flex>
                            {data.issueById.closedDate !== 'Pending' && (
                                <Flex mt="1">
                                    <Text
                                        fontSize="lg"
                                        fontWeight="semibold"
                                    >
                                        วันที่ปิด issued  : &nbsp;
                                    </Text>
                                    <Text fontSize="lg">
                                        {data.issueById.closedDate} &nbsp;
                                    </Text>
                                </Flex>
                            )}
                            <Flex mt="1">
                                <Text
                                    fontSize="lg"
                                    fontWeight="semibold"
                                >
                                    สถานะปัจจุบัน : &nbsp;
                                </Text>
                                <Text fontSize="lg">
                                    {data.issueById.status}
                                </Text>
                            </Flex>
                            <Flex mt="1">
                                <Text
                                    fontSize="lg"
                                    fontWeight="semibold"
                                >
                                    Success Rate : &nbsp;
                                </Text>
                                <Text fontSize="lg">
                                    {data.issueById.rate}%
                                </Text>
                            </Flex>
                            <Flex mt="1">
                                <Text
                                    fontSize="lg"
                                    fontWeight="semibold"
                                >
                                    สถานะการปิด issue : &nbsp;
                                </Text>
                                <Text fontSize="lg">
                                    {data.issueById.closedStatus}
                                </Text>
                            </Flex>
                            <Flex mt="1">
                                <Text
                                    fontSize="lg"
                                    fontWeight="semibold"
                                >
                                    สาเหตุของการ fail : &nbsp;
                                </Text>
                                <Text fontSize="lg">
                                    {data.issueById.failReason}
                                </Text>
                            </Flex>
                            <Flex mt="1">
                                <Text
                                    minW="110px"
                                    fontSize="lg"
                                    fontWeight="semibold"
                                >
                                    รายละเอียด : &nbsp;
                                </Text>
                                <Text fontSize="lg">
                                    {data.issueById.detail}
                                </Text>
                            </Flex>
                            <Flex mt="1">
                                <Text
                                    fontSize="lg"
                                    fontWeight="semibold"
                                >
                                    วันที่บันทึก : &nbsp;
                                </Text>
                                <Text fontSize="lg">
                                    {formatDateNew(+data.issueById.createdAt)} &nbsp;
                                </Text>
                            </Flex>

                            <TableContainer mt="3">
                                <Table variant='simple'>
                                    <Thead>
                                        <Tr
                                            bg={data.issueById.saleRole.branch === "ลาดกระบัง" ? "#1379ec" : "#0AB68B"}
                                            fontSize="18px"
                                        >
                                            <Th
                                                fontSize={["xs", "xs", "sm", "md"]}
                                                color="white">
                                                โมเดล
                                            </Th>
                                            <Th
                                                fontSize={["xs", "xs", "sm", "md"]}
                                                color="white">
                                                <Center>ขนาด</Center>
                                            </Th>
                                            <Th
                                                fontSize={["xs", "xs", "sm", "md"]}
                                                color="white">
                                                <Center>ยี่ห้อ</Center>
                                            </Th>
                                            <Th
                                                fontSize={["xs", "xs", "sm", "md"]}
                                                color="white">
                                                <Center>ประเภท</Center>
                                            </Th>
                                            <Th
                                                fontSize={["xs", "xs", "sm", "md"]}
                                                color="white">
                                                <Center>จำนวน</Center>
                                            </Th>
                                            <Th isNumeric
                                                fontSize={["xs", "xs", "sm", "md"]}
                                                color="white">
                                                มูลค่า
                                            </Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                            <Tr>
                                                <Td>{data.issueById.model}</Td>
                                                <Td><Center>{data.issueById.size}</Center></Td>
                                                <Td><Center>{data.issueById.brand}</Center></Td>
                                                <Td><Center>{data.issueById.category}</Center></Td>
                                                <Td><Center>{data.issueById.units}</Center></Td>
                                                <Td isNumeric>{formatAmount(data.issueById.issueValue)} บาท</Td>
                                            </Tr>
                                    </Tbody>
                                </Table>
                            </TableContainer>
                        </Flex>

                        <Text fontSize="xl" fontWeight="semibold" mt={6}>
                            รายละเอียดการเข้าพบลูกค้า
                        </Text>

                        <Grid templateColumns='repeat(3, 1fr)' gap={2}>
                            {data.issueById.visitLoaders && data.issueById.visitLoaders.map((item, i) => (
                                <Box
                                    key={item.id}
                                    minW="285px"
                                    p={2}
                                    mt={3}
                                    shadow='md'
                                    borderWidth='1px'
                                    borderRadius='md'
                                    cursor='pointer'
                                    _hover={{ bg: '#eee' }}
                                    onClick={() => history.push(`/sales-report/visit/${item.id}`)}
                                >
                                    <Heading fontSize='xl'>เข้าพบลูกค้าครั้งที่ : {i + 1}</Heading>
                                    <Stack isInline mt={3} justify="space-between">
                                        <Text
                                            fontSize={["sm", "sm", "md", "md"]}
                                            fontWeight="semibold"
                                        >
                                            วัตถุประสงค์การเข้า :{" "}
                                        </Text>
                                        <Text fontSize={["sm", "sm", "md", "md"]}>
                                            {item.jobPurpose}
                                        </Text>
                                    </Stack>
                                    <Stack isInline mt={3} justify="space-between">
                                        <Text
                                            fontSize={["sm", "sm", "md", "md"]}
                                            fontWeight="semibold"
                                        >
                                            วันที่ไปพบลูกค้า :{" "}
                                        </Text>
                                        <Text fontSize={["sm", "sm", "md", "md"]}>
                                            {item.visitDate}
                                        </Text>
                                    </Stack>
                                </Box>
                            ))}
                        </Grid>

                        <Flex w="100%" justifyContent="center" mt="5">
                            <Button
                                w="30%"
                                colorScheme="teal"
                                leftIcon={<EditIcon />}
                                onClick={() => setIsOpen(true)}
                            >
                                แก้ไข
                            </Button>
                            {isOpen && (
                                <SalesUpdateIssue
                                    Open={true}
                                    setOpen={() => setIsOpen(false)}
                                    branch={data.issueById.saleRole.branch}
                                    issueId={params.id}
                                    currentPrice={data.issueById.issueValue}
                                />
                            )}
                        </Flex>
                        {data.issueById.editIssues.length > 0 && (
                            <Flex 
                                mt="2"
                                px="6"
                                w="100%"
                                shadow='md'
                                borderWidth='1px'
                                borderRadius='md'
                            >
                                <Table variant='simple'>
                                    <TableCaption mt="0" placement="top" fontSize="24px" color="black">
                                        ประวัติการแก้ไข
                                    </TableCaption>
                                    <Thead>
                                        <Tr
                                            bg={data.issueById.saleRole.branch === "ลาดกระบัง" ? "#1379ec" : "#0AB68B"}
                                            fontSize="18px"
                                        >
                                            <Th isNumeric
                                                fontSize={["xs", "xs", "sm", "md"]}
                                                color="white">
                                                วันที่แก้ไข
                                            </Th>
                                            <Th
                                                fontSize={["xs", "xs", "sm", "md"]}
                                                color="white">
                                                แก้ไขครั้งที่
                                            </Th>
                                            <Th
                                                fontSize={["xs", "xs", "sm", "md"]}
                                                color="white">
                                                ชื่อผู้ทำการแก้ไข
                                            </Th>
                                            <Th
                                                fontSize={["xs", "xs", "sm", "md"]}
                                                color="white">
                                                Success Rate
                                            </Th>
                                            <Th
                                                fontSize={["xs", "xs", "sm", "md"]}
                                                color="white">
                                                Status
                                            </Th>
                                            <Th
                                                fontSize={["xs", "xs", "sm", "md"]}
                                                color="white">
                                                สถานะการปิด issue
                                            </Th>
                                            <Th
                                                fontSize={["xs", "xs", "sm", "md"]}
                                                color="white">
                                                สาเหตุของการ fail
                                            </Th>
                                            <Th
                                                fontSize={["xs", "xs", "sm", "md"]}
                                                color="white">
                                                วันที่ปิด issued
                                            </Th>
                                            <Th isNumeric
                                                fontSize={["xs", "xs", "sm", "md"]}
                                                color="white">
                                                มูลค่า
                                            </Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {data.issueById.editIssues.map((item, i) => (
                                            <Tr key={i}>
                                                <Td isNumeric>{formatDateNew(+item.createdAt)}</Td>
                                                <Td><Center>{i + 1}</Center></Td>
                                                <Td>{item.userEdit}</Td>
                                                <Td>{item.rate}%</Td>
                                                <Td>{item.status}</Td>
                                                <Td>{item.closedDate}</Td>
                                                <Td>{item.closedStatus}</Td>
                                                <Td>{item.failReason}</Td>
                                                <Td isNumeric>{formatAmount(item.issueValue)} บาท</Td>
                                            </Tr>
                                        ))}
                                    </Tbody>
                                </Table>
                            </Flex>
                        )}
                    </Flex>
                )}
            </Flex>
        </Flex>
    );
};

export default SalesIssueDetail;
