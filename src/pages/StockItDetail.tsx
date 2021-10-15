import React from 'react'
import { useParams } from "react-router-dom";
import {
    Text,
    Flex,
    Divider,
    Image,
    Stack,
    Center,
    // Button
} from "@chakra-ui/react";

import { useStockItByIdQuery } from '../generated/graphql';
import Spinner from "../components/Spinner";
import { formatAmount, formatDate } from "../utils/helpers"

interface Props { }

const StockItDetail: React.FC<Props> = () => {
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
                        <Flex
                            flexDir={["column", "column", "column", "row"]}
                            w={[null, null, null, "70%"]}
                            p={1}
                            rounded="7px"
                            boxShadow="md"
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
                                            Order ID : {data.stockItById.id}
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
                                    {data.stockItById.orders.map((value) => (
                                        <Text
                                            key={value.id}
                                            as="i"
                                            fontWeight="bold"
                                            fontSize="xl"
                                            color={!(value.holdStatus === "ยืม" || value.holdStatus === "เบิก") ? "cyan" : "orange"}
                                        >
                                            {value.holdStatus}
                                        </Text>
                                        //FIXME: หา Array ล่าสุดเพราะ holdStatus เป็น Array
                                    ))}
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
                                        ชื่อผู้ร้องขอ :{" "}
                                    </Text>
                                    <Text
                                        fontSize={["sm", "sm", "md", "md"]}
                                        as="i"
                                        fontWeight="semibold"
                                    >
                                        งง
                                        {/* {data.stockItById.orders}
                                            &nbsp; สาขา
                                            {data.giveOrderById.creator.roles === "client-LKB"
                                                ? "ลาดกระบัง"
                                                : data.giveOrderById.creator.roles === "client-CDC"
                                                    ? "ชลบุรี"
                                                    : "Admin"} */}
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
                                    <Text fontSize={["sm", "sm", "md", "md"]} w="60vh">
                                        รายละเอียด :{" "}
                                        </Text>
                                    <Text
                                        fontSize={["sm", "sm", "md", "md"]}
                                        as="i"
                                        fontWeight="semibold"
                                    >
                                        {data.stockItById.detail}
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
                                        {data.stockItById.createdAt &&
                                            formatDate(+data.stockItById.createdAt)}
                                    </Text>
                                    </Stack>
                                <Divider mt={3} orientation="horizontal" />

                                <Text fontSize={["sm", "sm", "md", "md"]} mt={3}>
                                    สถานะการจัดส่ง :{" "}
                                    </Text>
                                {/* <AdminStatusControl
                                        functionName="GiveOrder"
                                        id={data.giveOrderById.id}
                                        prevStatus={data.giveOrderById.status}
                                    /> */}
                            </Flex>
                        </Flex>
                )}
            </Center>
        </>
    )
}

export default StockItDetail