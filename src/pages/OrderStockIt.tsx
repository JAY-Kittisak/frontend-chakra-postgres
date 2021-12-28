import React from 'react'
import { Flex, Text, Divider } from "@chakra-ui/react";

import { useStockItOrdersQuery } from '../generated/graphql';
import Spinner from '../components/Spinner';
import AdminStockOrItem from '../components/StockIt/AdminStockOrItem';

interface Props { }

const OrderStockIt: React.FC<Props> = () => {
    const [{ data, fetching }] = useStockItOrdersQuery({
        variables: {
            createBy: true,
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
                Your order
            </Text>
            <Divider mt={1} mb={5} orientation="horizontal" />
            <Flex
                flexDir="column"
                p={9}
                rounded="7px"
                boxShadow="md"
                mt="5"
            >
                <Flex flexDir="column" overflowX="auto">
                    <Flex
                        // justify="space-around"
                        bg="#028174"
                        rounded="7px"
                        color="white"
                        h="35px"
                        align="center"
                    >
                        <Text
                            fontSize={["xs", "xs", "md", "xl"]}
                            fontWeight="bold"
                            w="16%"
                            textAlign="center"
                        >
                            วันที่สั่ง
                        </Text>
                        <Text
                            fontSize={["xs", "xs", "md", "xl"]}
                            fontWeight="bold"
                            w="18%"
                            textAlign="center"
                        >
                            รายละเอียด
                        </Text>
                        <Text
                            fontSize={["xs", "xs", "md", "xl"]}
                            fontWeight="bold"
                            w="15%"
                            textAlign="center"
                        >
                            Serial Number
                        </Text>
                        <Text
                            fontSize={["xs", "xs", "md", "xl"]}
                            fontWeight="bold"
                            w="21%"
                            textAlign="center"
                        >
                            Hold Status
                        </Text>
                        <Text
                            fontSize={["xs", "xs", "md", "xl"]}
                            fontWeight="bold"
                            w="12%"
                            textAlign="center"
                        >
                            สถานะ
                        </Text>
                        <Text
                            fontSize={["xs", "xs", "md", "xl"]}
                            fontWeight="bold"
                            w="18%"
                            textAlign="center"
                        >
                            Manage order
                        </Text>
                    </Flex>


                    <Flex flexDir="column">
                        {fetching || !data?.stockItOrders ? (
                            <Flex justify="center" mt="5">
                                <Spinner color="grey" height={50} width={50} />
                                <Text fontWeight="bold" fontSize="2xl">
                                    &nbsp; Loading...
                                </Text>
                            </Flex>
                        ) : (
                            data.stockItOrders.map((val) => (
                                <AdminStockOrItem toUrl="/stock-it/my-order/" key={val.id} order={val} />
                            ))
                        )}
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}

export default OrderStockIt