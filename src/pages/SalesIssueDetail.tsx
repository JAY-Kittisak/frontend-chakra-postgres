import React from "react";
import {
    Flex, Text, Divider, Stack, Button,
    Table, Center, Thead, Tbody, Tr, Th,
    Td, TableCaption
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { useParams } from "react-router-dom";
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

    const { isOpen, setIsOpen } = useDialog();

    const [{ data, fetching }] = useIssueByIdQuery({
        variables: {
            id: +params.id,
        },
    });

    return (
        <Flex px="5" flexDir="column">
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
                        <Flex w="80%">

                            <Flex flexDir="column" w="30%" p="6" mt="2" rounded="7px" boxShadow="md">
                                <Stack isInline justify="space-between">
                                    <Text
                                        fontSize={["sm", "sm", "md", "md"]}
                                        fontWeight="semibold"
                                    >
                                        Sale Name :{" "}
                                    </Text>
                                    <Text fontSize={["sm", "sm", "md", "md"]}>
                                        {data.issueById.saleName}
                                    </Text>
                                </Stack>
                                <Stack isInline mt={3} justify="space-between">
                                    <Text
                                        fontSize={["sm", "sm", "md", "md"]}
                                        fontWeight="semibold"
                                    >
                                        สาขา :{" "}
                                    </Text>
                                    <Text fontSize={["sm", "sm", "md", "md"]}>
                                        {data.issueById.branch}
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
                                        {data.issueById.visitDate}
                                    </Text>
                                </Stack>
                                <Stack isInline mt={3} justify="space-between">
                                    <Text
                                        fontSize={["sm", "sm", "md", "md"]}
                                        fontWeight="semibold"
                                    >
                                        วันที่สำเร็จโดยประมาณ :{" "}
                                    </Text>
                                    <Text fontSize={["sm", "sm", "md", "md"]}>
                                        {data.issueById.completionDate}
                                    </Text>
                                </Stack>
                                <Stack isInline mt={3} justify="space-between">
                                    <Text
                                        fontSize={["sm", "sm", "md", "md"]}
                                        fontWeight="semibold"
                                    >
                                        วันที่บันทึก :{" "}
                                    </Text>
                                    <Text fontSize={["sm", "sm", "md", "md"]}>
                                        {formatDateNew(+data.issueById.createdAt)}
                                    </Text>
                                </Stack>
                                <Stack isInline mt={3} justify="space-between">
                                    <Text
                                        fontSize={["sm", "sm", "md", "md"]}
                                        fontWeight="semibold"
                                    >
                                        Prob :{" "}
                                    </Text>
                                    <Text fontSize={["sm", "sm", "md", "md"]}>
                                        {data.issueById.prob}
                                    </Text>
                                </Stack>
                                <Stack isInline mt={3} justify="space-between">
                                    <Text
                                        fontSize={["sm", "sm", "md", "md"]}
                                        fontWeight="semibold"
                                    >
                                        Status :{" "}
                                    </Text>
                                    <Text fontSize={["sm", "sm", "md", "md"]}>
                                        {data.issueById.status}
                                    </Text>
                                </Stack>
                            </Flex>

                            <Flex flexDir="column" w="70%" p="6" ml="10" mt="2" rounded="7px" boxShadow="md">
                                <Stack isInline justify="space-between">
                                    <Text
                                        fontSize={["sm", "sm", "md", "md"]}
                                        fontWeight="semibold"
                                    >
                                        บริษัทติดต่อ :{" "}
                                    </Text>
                                    <Text fontSize={["sm", "sm", "md", "md"]}>
                                        {data.issueById.customer}
                                    </Text>
                                </Stack>

                                <Stack isInline mt={3} justify="space-around">
                                    <Text
                                        w="20%"
                                        fontSize={["sm", "sm", "md", "md"]}
                                        fontWeight="semibold"
                                    >
                                        Contact :{" "}
                                    </Text>
                                    <Text align="right" w="80%" fontSize={["sm", "sm", "md", "md"]}>
                                        {data.issueById.contact}
                                    </Text>
                                </Stack>
                                <Stack isInline mt={3} justify="space-between">
                                    <Text
                                        fontSize={["sm", "sm", "md", "md"]}
                                        fontWeight="semibold"
                                    >
                                        Quotation No. :{" "}
                                    </Text>
                                    <Text fontSize={["sm", "sm", "md", "md"]}>
                                        {data.issueById.quotationNo}
                                    </Text>
                                </Stack>
                                <Stack isInline mt={3} justify="space-between">
                                    <Text
                                        fontSize={["sm", "sm", "md", "md"]}
                                        fontWeight="semibold"
                                    >
                                        ยี่ห้อ :{" "}
                                    </Text>
                                    <Text fontSize={["sm", "sm", "md", "md"]}>
                                        {data.issueById.brand}
                                    </Text>
                                </Stack>
                                <Stack isInline mt={3} justify="space-between">
                                    <Text
                                        fontSize={["sm", "sm", "md", "md"]}
                                        fontWeight="semibold"
                                    >
                                        ประเภท :{" "}
                                    </Text>
                                    <Text fontSize={["sm", "sm", "md", "md"]}>
                                        {data.issueById.category}
                                    </Text>
                                </Stack>
                                <Stack isInline mt={3} justify="space-between">
                                    <Text
                                        fontSize={["sm", "sm", "md", "md"]}
                                        fontWeight="semibold"
                                    >
                                        มูลค่า :{" "}
                                    </Text>
                                    <Text fontSize={["sm", "sm", "md", "md"]}>
                                        {formatAmount(data.issueById.value)} บาท
                                    </Text>
                                </Stack>
                                <Stack isInline mt={3} justify="space-around">
                                    <Text
                                        w="20%"
                                        fontSize={["sm", "sm", "md", "md"]}
                                        fontWeight="semibold"
                                    >
                                        รายละเอียด :{" "}
                                    </Text>
                                    <Text align="right" w="80%" fontSize={["sm", "sm", "md", "md"]}>
                                        {data.issueById.detail}
                                    </Text>
                                </Stack>
                            </Flex>
                        </Flex>
                        <Flex w="100%" justifyContent="center" mt="5">
                            <Button
                                w="30%"
                                colorScheme={data.issueById.branch === "ลาดกระบัง" ? "blue" : "green"}
                                leftIcon={<EditIcon />}
                                onClick={() => setIsOpen(true)}
                            >
                                แก้ไข
                            </Button>
                            {isOpen && (
                                <SalesUpdateIssue
                                    Open={true}
                                    setOpen={() => setIsOpen(false)}
                                    branch={data.issueById.branch}
                                    issueId={params.id}
                                />
                            )}
                        </Flex>
                        {data.issueById.editIssues.length > 0 && (
                            <Flex rounded="7px" boxShadow="md" px='5' mt="3">
                                <Table variant='simple'>
                                    <TableCaption placement="top" fontSize="24px">
                                        ประวัติการแก้ไข
                                    </TableCaption>
                                    <Thead>
                                        <Tr
                                            bg={data.issueById.branch === "ลาดกระบัง" ? "#1379ec" : "#0AB68B"}
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
                                                Prob
                                            </Th>
                                            <Th
                                                fontSize={["xs", "xs", "sm", "md"]}
                                                color="white">
                                                Status
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
                                                <Td>{item.prob}</Td>
                                                <Td>{item.status}</Td>
                                                <Td isNumeric>{formatAmount(item.value)} บาท</Td>
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
