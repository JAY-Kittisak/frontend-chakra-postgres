import React from 'react'
import { useParams } from "react-router-dom";
import {
    Text,
    Flex,
    Divider,
    Image,
    Stack,
    Center,
    Button
} from "@chakra-ui/react";

import Spinner from "../components/Spinner";
import CreateStockOrder from '../components/StockIt/CreateStockOrder';
import { useDialog } from '../components/dialogs/useDialog';
import { useStockItByIdQuery } from '../generated/graphql';
import { formatAmount, formatDate } from "../utils/helpers"

interface Props { }

const StockItDetail: React.FC<Props> = () => {
    const { isOpen, setIsOpen } = useDialog();

    const params = useParams<{ id: string }>();
    const [{ data, fetching }] = useStockItByIdQuery({
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
                color="gray.600"
            >
                {data?.stockItById.itemName}
            </Text>
            <Divider mt={1} mb={3} orientation="horizontal" />
            <Center>
                {fetching &&
                    <Flex justify="center" mt="5">
                        <Spinner color="grey" height={50} width={50} />
                        <Text fontWeight="bold" fontSize="2xl">
                            &nbsp; Loading...
                        </Text>
                    </Flex>}

                {!data?.stockItById ? (
                    <Text>No data.</Text>
                ) : (
                        <Flex flexDir="column"
                            w={[null, null, null, "70%"]}
                            p={1}
                            rounded="7px"
                            boxShadow="md">
                            <Flex
                                flexDir={["column", "column", "column", "row"]}
                        >
                            <Flex
                                w={[null, null, null, "40%"]}
                                justify="center"
                                alignItems="center"
                            >
                                {data.stockItById.imageUrl && (
                                    <Image
                                        borderRadius="xl"
                                        boxSize="400px"
                                        src={data.stockItById.imageUrl}
                                    />
                                )}
                            </Flex>
                            <Flex p={5} flexDir="column" w={[null, null, null, "60%"]}>
                                <Stack isInline mt={3} justify="space-between">
                                    <Flex>
                                        <Text fontSize="xl" fontWeight="bold" align="center" mr="4">
                                            ID : {data.stockItById.id}
                                        </Text>
                                        {/* {data.stockItById.orders.map(value => (
                                                (value.holdStatus === "ยืม" || value.holdStatus === "เบิก") && (
                                                    <Button
                                                        colorScheme="orange"
                                                        mt="-1"
                                                        // onClick={printInvoice}
                                                        fontSize="xl"
                                                    >
                                                        Print
                                                    </Button>
                                                )
                                            ))} */}
                                    </Flex>
                                        <Text
                                            as="i"
                                            fontWeight="bold"
                                            fontSize="xl"
                                            color="cyan.500"
                                        >
                                        {data.stockItById.currentStatus}
                                    </Text>
                                    </Stack>
                                <Stack isInline mt={3} justify="space-between">
                                    <Text fontSize={["sm", "sm", "md", "md"]}>ชื่อสินค้า : </Text>
                                    <Text
                                        fontSize={["sm", "sm", "md", "md"]}
                                        as="i"
                                        fontWeight="semibold"
                                    >
                                        {data.stockItById.itemName}
                                    </Text>
                                </Stack>
                                    <Divider mt={3} orientation="horizontal" />
                                <Stack isInline mt={3} justify="space-between">
                                    <Text fontSize={["sm", "sm", "md", "md"]}>
                                        Serial Number :{" "}
                                    </Text>
                                    <Text
                                        fontSize={["sm", "sm", "md", "md"]}
                                        as="i"
                                        fontWeight="semibold"
                                    >
                                        {data.stockItById.serialNum}
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
                                        {data.stockItById.price &&
                                            formatAmount(data.stockItById.price)}{" "}
                                        บาท
                                    </Text>
                                    </Stack>
                                <Divider mt={3} orientation="horizontal" />
                                    <Stack isInline mt={3} justify="space-between">
                                        <Text fontSize={["sm", "sm", "md", "md"]}>สาขา : </Text>
                                        <Text
                                            fontSize={["sm", "sm", "md", "md"]}
                                            as="i"
                                            fontWeight="semibold"
                                        >
                                            {data.stockItById.branch}
                                        </Text>
                                    </Stack>
                                    <Divider mt={3} orientation="horizontal" />
                                <Stack isInline mt={3} justify="space-between">
                                    <Text fontSize={["sm", "sm", "md", "md"]}>Created Date : </Text>
                                    <Text
                                        fontSize={["sm", "sm", "md", "md"]}
                                        as="i"
                                        fontWeight="semibold"
                                    >
                                        {data.stockItById.createdAt &&
                                            formatDate(+data.stockItById.createdAt)}
                                    </Text>
                                </Stack>
                                    <Divider mt={3} orientation="horizontal" />
                                <Stack isInline mt={3} justify="space-between">
                                    <Text fontSize={["sm", "sm", "md", "md"]} w="40vh">
                                        รายละเอียด :{" "}
                                    </Text>
                                    <Text
                                        fontSize={["sm", "sm", "md", "md"]}
                                        as="i"
                                    >
                                        {data.stockItById.detail}
                                    </Text>
                                </Stack>
                                    <Divider mt={3} orientation="horizontal" />
                                </Flex>
                            </Flex>
                            <Flex flexDir="column" alignItems="center" mb="3">
                                <Button
                                    ml={3}
                                    mr={3}
                                    colorScheme="green"
                                    onClick={() => {
                                        setIsOpen(true);
                                    }}
                                >
                                    เบิก/ยืม
                                </Button>
                                {isOpen && (
                                    <CreateStockOrder
                                        stockItId={+params.id}
                                        Open={true}
                                        setOpen={() => setIsOpen(false)}
                                    />
                                )}
                            </Flex>
                        </Flex>
                )}
            </Center>
        </>
    )
}

export default StockItDetail