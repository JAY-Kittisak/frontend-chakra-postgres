import React from 'react'
import {
    Flex,
    Text,
    Divider,
    Stack,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useIssueByIdQuery } from '../generated/graphql';

import {
    formatAmount,
    formatDate,
} from "../utils/helpers";
import Spinner from "../components/Spinner";
import { useIsAuth } from '../utils/uselsAuth';

interface Props { }

const SalesIssueDetail: React.FC<Props> = () => {
    useIsAuth();

    const params = useParams<{ id: string }>();

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
            <Divider mt={1} mb={5} orientation="horizontal" />
            <Flex justify="center">
                {!data?.issueById || fetching ? (
                    <Flex justify="center" mt="5">
                        <Spinner color="grey" height={50} width={50} />
                        <Text fontWeight="bold" fontSize="2xl">
                            &nbsp; Loading... or No data.
                        </Text>
                    </Flex>
                ) : (
                    <Flex
                        flexDir="column"
                        w="50%"
                        p="6"
                        rounded="7px"
                        boxShadow="md"
                    >


                        <Stack isInline mt={3} justify="space-between">
                            <Text fontSize={["sm", "sm", "md", "md"]}>
                                Sale Name :{" "}
                            </Text>
                            <Text
                                fontSize={["sm", "sm", "md", "md"]}
                                as="i"
                                fontWeight="semibold"
                            >
                                {data.issueById.saleName}
                            </Text>
                        </Stack>
                        <Stack isInline mt={3} justify="space-between">
                            <Text fontSize={["sm", "sm", "md", "md"]}>
                                บริษัทติดต่อ :{" "}
                            </Text>
                            <Text
                                fontSize={["sm", "sm", "md", "md"]}
                                as="i"
                                fontWeight="semibold"
                            >
                                {data.issueById.customer}
                            </Text>
                        </Stack>

                            <Stack isInline mt={3} justify="space-around">
                                <Text w="20%" fontSize={["sm", "sm", "md", "md"]}>
                                    Contact :{" "}
                                </Text>
                                <Text
                                    align="right"
                                    w="80%"
                                    fontSize={["sm", "sm", "md", "md"]}
                                    as="i"
                                    fontWeight="semibold"
                                >
                                    {data.issueById.contact}
                                </Text>
                            </Stack>
                            <Stack isInline mt={3} justify="space-between">
                                <Text fontSize={["sm", "sm", "md", "md"]}>
                                Quotation No. :{" "}
                            </Text>
                            <Text
                                fontSize={["sm", "sm", "md", "md"]}
                                as="i"
                                fontWeight="semibold"
                            >
                                {data.issueById.quotationNo}
                            </Text>
                        </Stack>
                        <Stack isInline mt={3} justify="space-between">
                            <Text fontSize={["sm", "sm", "md", "md"]}>
                                ยี่ห้อ :{" "}
                            </Text>
                            <Text
                                fontSize={["sm", "sm", "md", "md"]}
                                as="i"
                                fontWeight="semibold"
                            >
                                    {data.issueById.brand}
                            </Text>
                        </Stack>
                        <Stack isInline mt={3} justify="space-between">
                            <Text fontSize={["sm", "sm", "md", "md"]}>
                                ประเภท :{" "}
                            </Text>
                            <Text
                                fontSize={["sm", "sm", "md", "md"]}
                                as="i"
                                fontWeight="semibold"
                            >
                                {data.issueById.category}
                            </Text>
                        </Stack>
                        <Stack isInline mt={3} justify="space-around">
                            <Text w="20%" fontSize={["sm", "sm", "md", "md"]}>
                                รายละเอียด :{" "}
                            </Text>
                            <Text
                                align="right"
                                w="80%"
                                fontSize={["sm", "sm", "md", "md"]}
                                as="i"
                                fontWeight="semibold"
                            >
                                {data.issueById.detail}
                            </Text>
                        </Stack>
                        <Stack isInline mt={3} justify="space-between">
                            <Text fontSize={["sm", "sm", "md", "md"]}>
                                Prob :{" "}
                            </Text>
                            <Text
                                fontSize={["sm", "sm", "md", "md"]}
                                as="i"
                                fontWeight="semibold"
                            >
                                {data.issueById.prob}
                            </Text>
                        </Stack>
                        <Stack isInline mt={3} justify="space-between">
                            <Text fontSize={["sm", "sm", "md", "md"]}>
                                Status :{" "}
                            </Text>
                            <Text
                                fontSize={["sm", "sm", "md", "md"]}
                                as="i"
                                fontWeight="semibold"
                            >
                                {data.issueById.status}
                            </Text>
                        </Stack>
                        <Stack isInline mt={3} justify="space-between">
                            <Text fontSize={["sm", "sm", "md", "md"]}>
                                มูลค่า :{" "}
                            </Text>
                            <Text
                                fontSize={["sm", "sm", "md", "md"]}
                                as="i"
                                fontWeight="semibold"
                            >
                                {formatAmount(data.issueById.value)}
                            </Text>
                        </Stack>
                        <Stack isInline mt={3} justify="space-between">
                            <Text fontSize={["sm", "sm", "md", "md"]}>
                                วันที่ไปพบลูกค้า :{" "}
                            </Text>
                            <Text
                                fontSize={["sm", "sm", "md", "md"]}
                                as="i"
                                fontWeight="semibold"
                            >
                                {formatDate(+data.issueById.createdAt)}
                            </Text>
                        </Stack>
                        <Stack isInline mt={3} justify="space-between">
                            <Text fontSize={["sm", "sm", "md", "md"]}>
                                วันที่แก้ไข :{" "}
                            </Text>
                            <Text
                                fontSize={["sm", "sm", "md", "md"]}
                                as="i"
                                fontWeight="semibold"
                            >
                                {formatDate(+data.issueById.updatedAt)}
                            </Text>
                        </Stack>
                        <Stack isInline mt={3} justify="space-between">
                            <Text fontSize={["sm", "sm", "md", "md"]}>
                                สาขา :{" "}
                            </Text>
                            <Text
                                fontSize={["sm", "sm", "md", "md"]}
                                as="i"
                                fontWeight="semibold"
                            >
                                {data.issueById.branch}
                            </Text>
                        </Stack>
                    </Flex>
                )}
            </Flex>
        </Flex>
    )
}

export default SalesIssueDetail