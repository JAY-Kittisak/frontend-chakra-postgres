import React from "react";
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
import { useJobItByIdQuery } from "../generated/graphql";
import { formatDate, formatUpperCase } from "../utils/helpers";
import ITComment from "../components/jobIT/ITComment";

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
                            w={[null, null, null, "40%"]}
                        p={1}
                        rounded="7px"
                        boxShadow="md"
                        bg={bg}
                    >
                            <Flex p={5} flexDir="column" w={[null, null, null, "100%"]}>
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
                                            : data.jobITById.status === "Wait Approve"
                                                ? "orange"
                                                : data.jobITById.status === "Success"
                                                    ? "green"
                                                    : data.jobITById.status === "Impossible"
                                                        ? "red"
                                                    : undefined
                                    }
                                >
                                    {data.jobITById.status}
                                </Text>
                            </Stack>

                                <Stack isInline mt={3} justify="space-between">
                                    <Text fontSize={["sm", "sm", "md", "md"]}>ผู้แจ้งงาน : </Text>
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
                                    <Text fontSize={["sm", "sm", "md", "md"]}>
                                        เรื่องที่แจ้ง Job :{" "}
                                    </Text>
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
                                    <Text fontSize={["sm", "sm", "md", "md"]}>Category : </Text>
                                    <Text
                                        fontSize={["sm", "sm", "md", "md"]}
                                        as="i"
                                        fontWeight="semibold"
                                    >
                                        {formatUpperCase(data.jobITById.category)}
                                    </Text>
                                </Stack>
                                <Divider mt={3} orientation="horizontal" />

                                <Stack isInline mt={3} justify="space-between">
                                    <Text fontSize={["sm", "sm", "md", "md"]}>
                                        วันที่แจ้ง Job :{" "}
                                    </Text>
                                    <Text
                                        fontSize={["sm", "sm", "md", "md"]}
                                        as="i"
                                        fontWeight="semibold"
                                    >
                                        {formatDate(+data.jobITById.createdAt)}
                                    </Text>
                                </Stack>
                                <Divider mt={3} orientation="horizontal" />

                                <Stack isInline mt={3} justify="space-between">
                                    <Text fontSize={["sm", "sm", "md", "md"]}>
                                        วันที่ต้องการ :{" "}
                                    </Text>
                                    <Text
                                        fontSize={["sm", "sm", "md", "md"]}
                                        as="i"
                                        fontWeight="semibold"
                                    >
                                        {data.jobITById.desiredDate}
                                    </Text>
                                </Stack>
                                <Divider mt={3} orientation="horizontal" />

                                {data.jobITById.itComment &&
                                    data.jobITById.status === "Success" ? (
                                    <>
                                            <Stack isInline mt={3} justify="space-between">
                                                <Text fontSize={["sm", "sm", "md", "md"]}>
                                                    IT ผู้ปฏิบัติงาน :{" "}
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
                                                <Text fontSize={["sm", "sm", "md", "md"]}>
                                                    IT Comment :{" "}
                                                </Text>
                                                <Text
                                                    fontSize={["sm", "sm", "md", "md"]}
                                                    as="i"
                                                    fontWeight="semibold"
                                                >
                                                    {data.jobITById.itComment}
                                                </Text>
                                            </Stack>
                                            <Divider mt={3} orientation="horizontal" />
                                    </>
                                ) : (
                                    <ITComment id={data.jobITById.id} comment={data.jobITById.itComment as string} />
                                )}

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
};

export default ManageJobITDetail;
