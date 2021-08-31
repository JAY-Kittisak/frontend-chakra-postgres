import React from "react";
import { Flex, Text, useColorModeValue } from "@chakra-ui/react";


import Layout from "../components/Layout";
import Spinner from "../components/Spinner";
import { useGiveOrdersQuery } from "../generated/graphql";
import AdminOrderGivesItem from "../components/gives/AdminOrderGivesItem";

interface Props { }

const ManageGiveOrders: React.FC<Props> = () => {
    const [{ data, fetching }] = useGiveOrdersQuery()
    const bg = useColorModeValue("white", "gray.700");
    const bgColumn = useColorModeValue("#028174", "#3E54D3");

    return (
        <Layout variant="regular">
            <Text
                as="i"
                fontWeight="semibold"
                fontSize={["md", "md", "xl", "3xl"]}
                my={2}
            >
                Your order
            </Text>

            <Flex flexDir="column" p={9} rounded="7px" boxShadow="md" bg={bg}>
                <Flex flexDir="column" overflowX="auto">
                    <Flex
                        // justify="space-around"
                        bg={bgColumn}
                        rounded="7px"
                        color="white"
                        h="35px"
                        align="center"
                    >
                        <Text fontSize={["xs", "xs", "md", "xl"]} fontWeight="bold" w="16%" textAlign="center">
                            วันที่สั่ง
                        </Text>
                        <Text fontSize={["xs", "xs", "md", "xl"]} fontWeight="bold" w="18%" textAlign="center">
                            ผู้เบิก
                        </Text>
                        <Text fontSize={["xs", "xs", "md", "xl"]} fontWeight="bold" w="15%" textAlign="center">
                            จำนวนร้องขอ
                        </Text>
                        <Text fontSize={["xs", "xs", "md", "xl"]} fontWeight="bold" w="21%" textAlign="center">
                            ราคารวม
                        </Text>
                        <Text fontSize={["xs", "xs", "md", "xl"]} fontWeight="bold" w="12%" textAlign="center">
                            สถานะ
                        </Text>
                        <Text fontSize={["xs", "xs", "md", "xl"]} fontWeight="bold" w="18%" textAlign="center">
                            Manage order
                        </Text>
                    </Flex>

                    <Flex flexDir="column">
                        {fetching || !data?.giveOrders ? (
                            <Flex justify="center" mt="5">
                                <Spinner color="grey" height={50} width={50} />
                                <Text fontWeight="bold" fontSize="2xl">
                                    &nbsp; Loading...
                                </Text>
                            </Flex>
                        ) : (
                            data.giveOrders.map((order) => (
                                <AdminOrderGivesItem key={order.id} order={order} />
                            ))
                        )}
                    </Flex>
                </Flex>
            </Flex>
        </Layout>
    )
}

export default ManageGiveOrders