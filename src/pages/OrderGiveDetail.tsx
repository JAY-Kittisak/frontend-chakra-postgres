import React from "react";
import { useParams } from "react-router-dom";
import {
    useColorModeValue,
    Flex,
    Text,
    Image,
    Stack,
    // Button,
    Center,
    // IconButton,
    Divider,
    useColorMode,
} from "@chakra-ui/react";

import Layout from "../components/Layout";
import Spinner from "../components/Spinner";
import { useGiveOrderByIdQuery } from "../generated/graphql";
import { formatAmount, formatDate } from "../utils/helpers";

interface Props { }

const OrderGiveDetail: React.FC<Props> = () => {
    const bg = useColorModeValue("white", "gray.700");
    const { colorMode } = useColorMode();

    const params = useParams<{ orderId: string }>();
    const [{ data, fetching }] = useGiveOrderByIdQuery({
        variables: {
            id: +params.orderId,
        },
    });

    return (
        <Layout variant="regular">
            <Text as="i" fontWeight="semibold" fontSize={["xl", "xl", "xl", "3xl"]}>
                รายละเอียด Order
            </Text>
            <Divider mt={1} mb={5} orientation="horizontal" />

            <Center>
                {fetching && (
                    <Flex justify="center" mt="5">
                        <Spinner color="grey" height={50} width={50} />
                        <Text fontWeight="bold" fontSize="2xl">
                            &nbsp; Loading...
                        </Text>
                    </Flex>
                )}

                {!data?.giveOrderById ? (
                    <Text>No data.</Text>
                ) : (
                    <Flex flexDir={["column", "column", "column", "row"]} w={[null, null, null, "70%"]} p={5} rounded="7px" boxShadow="md" bg={bg}>
                        <Flex w={[null, null, null, "40%"]} justify="center">
                            {data.giveOrderById.give.imageUrl && (
                                <Image
                                    boxSize="400px"
                                    src={data.giveOrderById.give.imageUrl}
                                />
                            )}
                        </Flex>
                        <Flex p={5} flexDir="column" w={[null, null, null, "60%"]}>
                            <Stack isInline mt={3} justify="space-between">
                                <Text
                                    fontSize="xl"
                                    fontWeight="bold"
                                    align="center"
                                >
                                    Order ID : {data.giveOrderById.id}
                                </Text>
                                <Text
                                    as="i"
                                    fontWeight="bold"
                                    fontSize="xl"
                                    color={
                                        data.giveOrderById.status === "New"
                                            ? colorMode === "light"
                                                ? "cyan.600"
                                                : "cyan"
                                            : data.giveOrderById.status === "Preparing"
                                                ? "orange"
                                                : data.giveOrderById.status === "Success"
                                                    ? "green"
                                                    : undefined
                                    }
                                >
                                    {data.giveOrderById.status}
                                </Text>
                            </Stack>
                            <Stack isInline mt={3}>
                                <Text
                                    fontSize={["sm", "sm", "md", "md"]}
                                    fontWeight="semibold"
                                >
                                    จำนวนที่เบิก :{" "}
                                </Text>
                                <Text fontSize={["sm", "sm", "md", "md"]}>
                                    {data.giveOrderById.amount}
                                </Text>
                            </Stack>
                            <Divider mt={3} orientation="horizontal" />
                            <Stack isInline mt={3}>
                                <Text
                                    fontSize={["sm", "sm", "md", "md"]}
                                    fontWeight="semibold"
                                >
                                    ราคารวม :{" "}
                                </Text>
                                <Text fontSize={["sm", "sm", "md", "md"]}>
                                    {data.giveOrderById.price &&
                                        formatAmount(data.giveOrderById.price)}
                                </Text>
                            </Stack>
                            <Divider mt={3} orientation="horizontal" />
                            <Text
                                fontSize={["sm", "sm", "md", "md"]}
                                mt={3}
                                fontWeight="semibold"
                            >
                                ชื่อสินค้า :{" "}
                            </Text>
                            <Text fontSize={["sm", "sm", "md", "md"]} ml="6">
                                {data.giveOrderById.give.giveName}
                            </Text>
                            <Divider mt={3} orientation="horizontal" />
                            <Text
                                fontSize={["sm", "sm", "md", "md"]}
                                mt={3}
                                fontWeight="semibold"
                            >
                                รายละเอียด :{" "}
                            </Text>
                            <Text fontSize={["sm", "sm", "md", "md"]} ml="6">
                                {data.giveOrderById.customerDetail}
                            </Text>
                            <Divider mt={3} orientation="horizontal" />
                            <Stack isInline mt={3}>
                                <Text
                                    fontSize={["sm", "sm", "md", "md"]}
                                    fontWeight="semibold"
                                >
                                    วันที่เบิก :{" "}
                                </Text>
                                <Text fontSize={["sm", "sm", "md", "md"]}>
                                    {data.giveOrderById.createdAt &&
                                        formatDate(+data.giveOrderById.createdAt)}
                                </Text>
                            </Stack>
                            <Divider mt={3} orientation="horizontal" />
                        </Flex>
                    </Flex>
                )}
            </Center>
        </Layout>
    );
};

export default OrderGiveDetail;
