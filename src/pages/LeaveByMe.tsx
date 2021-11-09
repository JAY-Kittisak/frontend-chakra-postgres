import React from 'react'
import {
    Flex,
    Text,
    Table,
    Tbody,
    Th,
    Thead,
    Tr,
    Center,
    Divider,
} from "@chakra-ui/react";

import { useIsAuth } from '../utils/uselsAuth'
import Spinner from "../components/Spinner";
import { useLeavesQuery } from '../generated/graphql';
import LeaveApprovalItem from '../components/leave/LeaveApprovalItem';

interface Props { }

const LeaveByMe: React.FC<Props> = () => {
    useIsAuth()
    const [{ data, fetching }] = useLeavesQuery({
        variables: {
            createBy: true,
        },
    });

    return (
        <Flex flexDir={["column", "column", "column", "column", "row"]}>
            <Flex
                w={["100%", "100%", "100%", "100%", "100%"]}
                flexDir="column"
                mr="2"
            >
                <Text
                    as="i"
                    fontWeight="semibold"
                    fontSize={["md", "md", "xl", "3xl"]}
                    color="gray.600"
                >
                    ประวัติการขอลางาน
                </Text>
                <Divider orientation="horizontal" />
                <Flex flexDir="column" mt="10">
                    {(fetching) ? (
                        <Center>
                            <Spinner color="grey" height={50} width={50} />
                            <Text
                                as="i"
                                fontWeight="semibold"
                                fontSize={["md", "md", "xl", "3xl"]}
                                my={2}
                            >
                                {" "}
                                &nbsp; Loading...
                            </Text>
                        </Center>
                    ) : (
                        <>
                            <Flex w="100%" overflowX="auto" rounded="7px" boxShadow="md">
                                <Table variant="simple" colorScheme="blackAlpha">
                                    <Thead>
                                        <Tr bg="#028174">
                                            <Th
                                                textAlign="center"
                                                fontSize={["xs", "xs", "sm", "md"]}
                                                color="white"
                                                w="10%"
                                            >
                                                วันที่
                                            </Th>
                                            <Th
                                                textAlign="center"
                                                fontSize={["xs", "xs", "sm", "md"]}
                                                color="white"
                                                w="10%"
                                            >
                                                ผู้ขอ
                                            </Th>
                                            <Th
                                                textAlign="center"
                                                fontSize={["xs", "xs", "sm", "md"]}
                                                color="white"
                                                w="10%"
                                            >
                                                เรื่อง
                                            </Th>
                                            <Th
                                                textAlign="center"
                                                fontSize={["xs", "xs", "sm", "md"]}
                                                color="white"
                                                w="20%"
                                            >
                                                รายละเอียด
                                            </Th>
                                            <Th
                                                textAlign="center"
                                                fontSize={["xs", "xs", "sm", "md"]}
                                                color="white"
                                                w="10%"
                                            >
                                                จำนวนวัน
                                            </Th>
                                            <Th
                                                textAlign="center"
                                                fontSize={["xs", "xs", "sm", "md"]}
                                                color="white"
                                                w="10%"
                                            >
                                                ลาตั้งแต่วันที่
                                            </Th>
                                            <Th
                                                textAlign="center"
                                                fontSize={["xs", "xs", "sm", "md"]}
                                                color="white"
                                                w="10%"
                                            >
                                                ถึงวันที่
                                            </Th>
                                            <Th
                                                textAlign="center"
                                                fontSize={["xs", "xs", "sm", "md"]}
                                                color="white"
                                                w="20%"
                                            >
                                                สถานะ
                                            </Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {data?.leaves?.map((val) => (
                                            <LeaveApprovalItem key={val.id} item={val} />
                                        ))}
                                    </Tbody>
                                </Table>
                            </Flex>
                        </>
                    )}
                </Flex>
            </Flex>
        </Flex>
    )
}

export default LeaveByMe