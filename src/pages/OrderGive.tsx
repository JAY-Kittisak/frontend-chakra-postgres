import React from "react";
import {
    Flex,
    Table,
    Tbody,
    Text,
    Th,
    Thead,
    Tr,
    useColorMode,
} from "@chakra-ui/react";

import { useMeQuery } from "../generated/graphql";
import Layout from "../components/Layout";
import Spinner from "../components/Spinner";
import OrderGiveItem from "../components/gives/OrderGiveItem";

interface Props { }

const OrderGive: React.FC<Props> = () => {
    const [{ data, fetching }] = useMeQuery();
    const { colorMode } = useColorMode();

    if (fetching) return <Spinner color="grey" height={50} width={50} />;

    return (
        <Layout variant="regular">
            <Flex flexDir="column">
                <Text
                    as="i"
                    fontWeight="semibold"
                    fontSize={["md", "md", "xl", "3xl"]}
                    my={2}
                >
                    Your order
                </Text>

                {/* // <Text key={order.id}>{order.give.giveName}</Text> */}
                <Flex w="100%" overflowX="auto" rounded="7px" boxShadow="xl">
                    <Table
                        variant="striped"
                        colorScheme={colorMode === "light" ? "green" : "blue"}
                    >
                        <Thead>
                            <Tr bg={colorMode === "light" ? "#028174" : "#3E54D3"}>
                                <Th textAlign="center" fontSize="md" w="20%" color="white">
                                    วันที่สั่ง
                                </Th>
                                <Th textAlign="center" fontSize="md" w="20%" color="white">
                                    ชื่อของที่เบิก
                                </Th>
                                <Th textAlign="center" fontSize="md" w="10%" color="white">
                                    รายละเอียด
                                </Th>
                                <Th textAlign="center" fontSize="md" w="15%" color="white">
                                    จำนวนร้องขอ
                                </Th>
                                <Th textAlign="center" fontSize="md" w="15%" color="white">
                                    ราคารวม
                                </Th>
                                <Th textAlign="center" fontSize="md" w="10%" color="white">
                                    สถานะ
                                </Th>
                                <Th textAlign="center" fontSize="md" w="20%" color="red">
                                    ลบออกไม่ใช้แล้ว
                                </Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {data?.me?.giveOrders &&
                                data.me.giveOrders.map((order) => (
                                    <OrderGiveItem key={order.id} order={order} />
                                ))}
                            {/* {!industrialEstate ? (
                                    <div>Loading...</div>
                                ) : (
                                    industrialEstate.map((factory) => (
                                        <FactoryItem key={factory.id} factory={factory} />
                                    ))
                                )} */}
                        </Tbody>
                    </Table>
                </Flex>
            </Flex>
        </Layout>
    );
};

export default OrderGive;
