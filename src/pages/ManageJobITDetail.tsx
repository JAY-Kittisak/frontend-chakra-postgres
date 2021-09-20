import React from 'react'
import { useParams } from "react-router-dom";
import {
    useColorModeValue,
    Flex,
    Text,
    Stack,
    Center,
    Divider,
    useColorMode,
} from "@chakra-ui/react";

import Spinner from "../components/Spinner";
import AdminStatusControl from "../components/AdminStatusControl";
import { useJobItByIdQuery } from '../generated/graphql';
import { formatDate } from '../utils/helpers';

interface Props { }

const ManageJobITDetail: React.FC<Props> = () => {
    const bg = useColorModeValue("white", "gray.700");
    const { colorMode } = useColorMode();

    const params = useParams<{ id: string }>();
    const [{ data, fetching }] = useJobItByIdQuery({
        variables: {
            id: +params.id,
        },
    });
    return (
        <>
            <Text
                as="i"
                fontWeight="semibold"
                fontSize={["md", "md", "xl", "3xl"]}
                bgGradient="linear(to-l, #7928CA,#FF0080)"
                bgClip="text"
            >
                Admin manage Job IT
            </Text>
            <Divider mt={1} mb={5} orientation="horizontal" />

            <Center>
                {!data?.jobITById || fetching ? (
                    <Flex justify="center" mt="5">
                        <Spinner color="grey" height={50} width={50} />
                        <Text fontWeight="bold" fontSize="2xl">
                            &nbsp; Loading... or No data.
                        </Text>
                    </Flex>
                ) : (
                    <Flex
                        flexDir={["column", "column", "column", "row"]}
                        w={[null, null, null, "70%"]}
                        p={1}
                        rounded="7px"
                        boxShadow="md"
                        bg={bg}
                    >
                        <Flex p={5} flexDir="column" w={[null, null, null, "60%"]}>
                            <Stack isInline mt={3} justify="space-between">
                                <Flex>
                                    <Text fontSize="xl" fontWeight="bold" align="center" mr="4">
                                        Job ID : {data.jobITById.id}
                                    </Text>
                                </Flex>
                                <Text
                                    as="i"
                                    fontWeight="bold"
                                    fontSize="xl"
                                    color={
                                        data.jobITById.status === "New"
                                            ? colorMode === "light"
                                                ? "cyan.600"
                                                : "cyan"
                                            : data.jobITById.status === "Preparing"
                                                ? "orange"
                                                : data.jobITById.status === "Success"
                                                    ? "green"
                                                    : undefined
                                    }
                                >
                                    {data.jobITById.status}
                                </Text>
                            </Stack>

                            <Stack isInline mt={3} justify="space-between">
                                <Text fontSize={["sm", "sm", "md", "md"]}>
                                    จำนวนที่เบิก :{" "}
                                </Text>
                                <Text
                                    fontSize={["sm", "sm", "md", "md"]}
                                    as="i"
                                    fontWeight="semibold"
                                >
                                    {data.jobITById.desiredDate} ชิ้น
                                </Text>
                            </Stack>
                            <Divider mt={3} orientation="horizontal" />

                            <Stack isInline mt={3} justify="space-between">
                                <Text fontSize={["sm", "sm", "md", "md"]}>
                                    ชื่อผู้ร้องขอ :{" "}
                                </Text>
                                <Text
                                    fontSize={["sm", "sm", "md", "md"]}
                                    as="i"
                                    fontWeight="semibold"
                                >
                                    {data.jobITById.creator.fullNameTH}
                                </Text>
                            </Stack>
                            <Divider mt={3} orientation="horizontal" />

                            <Stack isInline mt={3} justify="space-between">
                                <Text fontSize={["sm", "sm", "md", "md"]}>ราคารวม : </Text>
                                <Text
                                    fontSize={["sm", "sm", "md", "md"]}
                                    as="i"
                                    fontWeight="semibold"
                                >
                                    บาท
                                </Text>
                            </Stack>
                            <Divider mt={3} orientation="horizontal" />

                            <Stack isInline mt={3} justify="space-between">
                                <Text fontSize={["sm", "sm", "md", "md"]}>ชื่อสินค้า : </Text>
                                <Text
                                    fontSize={["sm", "sm", "md", "md"]}
                                    as="i"
                                    fontWeight="semibold"
                                >
                                    {data.jobITById.titled}
                                </Text>
                            </Stack>
                            <Divider mt={3} orientation="horizontal" />

                            <Stack isInline mt={3} justify="space-between">
                                <Text fontSize={["sm", "sm", "md", "md"]} w="60vh">
                                    รายละเอียด :{" "}
                                </Text>
                                <Text
                                    fontSize={["sm", "sm", "md", "md"]}
                                    as="i"
                                    fontWeight="semibold"
                                >
                                    {data.jobITById.itActionName}
                                </Text>
                            </Stack>
                            <Divider mt={3} orientation="horizontal" />

                            <Stack isInline mt={3} justify="space-between">
                                <Text fontSize={["sm", "sm", "md", "md"]}>วันที่เบิก : </Text>
                                <Text
                                    fontSize={["sm", "sm", "md", "md"]}
                                    as="i"
                                    fontWeight="semibold"
                                >
                                    {data.jobITById.createdAt &&
                                        formatDate(+data.jobITById.createdAt)}
                                </Text>
                            </Stack>
                            <Divider mt={3} orientation="horizontal" />

                            <Text fontSize={["sm", "sm", "md", "md"]} mt={3}>
                                สถานะการจัดส่ง :{" "}
                            </Text>
                            <AdminStatusControl
                                functionName="JobIT"
                                id={data.jobITById.id}
                                prevStatus={data.jobITById.status}
                            />
                        </Flex>
                    </Flex>
                )}
            </Center>
        </>
    );
}

export default ManageJobITDetail