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
        <>
            <Text
                as="i"
                fontWeight="semibold"
                fontSize={["md", "md", "xl", "3xl"]}
                bgGradient="linear(to-l, teal.500,green.500)"
                bgClip="text"
            >
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
                        <Flex
                            flexDir={["column", "column", "column", "row"]}
                            w={[null, null, "70%", "70%"]}
                            p="1"
                            rounded="7px"
                            boxShadow="md"
                            bg={bg}
                        >
                            <Flex w={[null, null, null, "40%"]} justify="center">
                                {data.giveOrderById.give.imageUrl && (
                                    <Image borderRadius="xl" boxSize="400px" src={data.giveOrderById.give.imageUrl} />
                                )}
                            </Flex>
                            <Flex p={5} flexDir="column" w={[null, null, null, "60%"]} justify="center">

                                <Stack isInline mt={3} justify="space-between" mb="10">
                                    <Text fontSize={["md", "xl", "xl", "2xl"]} fontWeight="bold" align="center">
                                        Order ID : {data.giveOrderById.id}
                                    </Text>
                                    <Text
                                        as="i"
                                        fontWeight="bold"
                                        fontSize={["md", "xl", "xl", "2xl"]}
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

                                <Stack isInline mt={3} justify="space-between">
                                    <Text fontSize={["sm", "sm", "md", "xl"]}>จำนวนที่เบิก : </Text>
                                    <Text fontSize={["sm", "sm", "md", "xl"]} fontWeight="semibold">
                                        {data.giveOrderById.amount} ชิ้น
                                    </Text>
                                </Stack>
                                <Divider mt={3} orientation="horizontal" />

                                <Stack isInline mt={3} justify="space-between">
                                    <Text fontSize={["sm", "sm", "md", "xl"]}>ราคารวม : </Text>
                                    <Text fontSize={["sm", "sm", "md", "xl"]} fontWeight="semibold">
                                        {data.giveOrderById.price &&
                                            formatAmount(data.giveOrderById.price)} บาท
                                    </Text>
                                </Stack>
                                <Divider mt={3} orientation="horizontal" />

                                <Stack isInline mt={3} justify="space-between">
                                    <Text fontSize={["sm", "sm", "md", "xl"]}>
                                        ชื่อสินค้า :{" "}
                                    </Text>
                                    <Text fontSize={["sm", "sm", "md", "xl"]} fontWeight="semibold">
                                        {data.giveOrderById.give.giveName}
                                    </Text>
                                </Stack>
                                <Divider mt={3} orientation="horizontal" />

                                <Stack isInline mt={3} justify="space-between">
                                    <Text fontSize={["sm", "sm", "md", "xl"]} >
                                        รายละเอียด :{" "}
                                    </Text>
                                    <Text fontSize={["sm", "sm", "md", "xl"]} fontWeight="semibold">
                                        {data.giveOrderById.customerDetail}
                                    </Text>
                                </Stack>
                                <Divider mt={3} orientation="horizontal" />

                                <Stack isInline mt={3} justify="space-between">
                                    <Text fontSize={["sm", "sm", "md", "xl"]}>วันที่เบิก : </Text>
                                    <Text fontSize={["sm", "sm", "md", "xl"]} fontWeight="semibold">
                                    {data.giveOrderById.createdAt &&
                                        formatDate(+data.giveOrderById.createdAt)}
                                </Text>
                            </Stack>
                            <Divider mt={3} orientation="horizontal" />
                        </Flex>
                    </Flex>
                )}
            </Center>
        </>
    );
};

export default OrderGiveDetail;
