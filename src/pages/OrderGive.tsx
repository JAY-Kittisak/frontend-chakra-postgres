import React from "react";
import {
    Flex, Text, useColorModeValue, Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
} from "@chakra-ui/react";

import { useGiveOrderByCreatorIdCdcQuery, useGiveOrderByCreatorIdQuery } from "../generated/graphql";
import Spinner from "../components/Spinner";
import OrderGiveItem from "../components/gives/OrderGiveItem";
import OrderGiveItemCdc from "../components/gives/OrderGiveItemCdc";

interface Props { }

const OrderGive: React.FC<Props> = () => {
    const [{ data, fetching }] = useGiveOrderByCreatorIdQuery();
    const [{ data: dataCdc, fetching: fetchingCdc }] = useGiveOrderByCreatorIdCdcQuery();
    const bg = useColorModeValue("white", "gray.700");
    const bgColumn = useColorModeValue("#028174", "#3E54D3");

    return (
        <>
            <Text
                as="i"
                fontWeight="semibold"
                fontSize={["md", "md", "xl", "3xl"]}
                bgGradient="linear(to-l, teal.500,green.500)"
                bgClip="text"
            >
                Your order
            </Text>

            <Tabs align="end" variant="enclosed" mt="-8">
                <TabList>
                    <Tab>ลาดกระบัง</Tab>
                    <Tab>ชลบุรี</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <Flex flexDir="column" p={9} rounded="7px" boxShadow="md" bg={bg}>
                <Flex flexDir="column">
                    <Flex
                        justify="space-around"
                        bg={bgColumn}
                        rounded="7px"
                        color="white"
                        h="35px"
                        align="center"
                    >
                        <Text fontSize={["md", "md", "xl", "xl"]} fontWeight="bold">
                            วันที่สั่ง
                        </Text>
                        <Text fontSize={["md", "md", "xl", "xl"]} fontWeight="bold">
                            จำนวนร้องขอ
                        </Text>
                        <Text fontSize={["md", "md", "xl", "xl"]} fontWeight="bold">
                            ราคารวม
                        </Text>
                        <Text fontSize={["md", "md", "xl", "xl"]} fontWeight="bold">
                            สถานะ
                        </Text>
                    </Flex>

                    <Flex flexDir="column">
                        {fetching || !data?.giveOrderByCreatorId ? (
                            <Flex justify="center" mt="5">
                                <Spinner color="grey" height={50} width={50} />
                                <Text fontWeight="bold" fontSize="2xl">
                                    &nbsp; Loading...
                                </Text>
                            </Flex>
                        ) : (
                            data.giveOrderByCreatorId.map((order) => (
                                <OrderGiveItem key={order.id} order={order} />
                            ))
                        )}
                    </Flex>
                </Flex>
            </Flex>
                    </TabPanel>
                    {/* -------------------------------------------------------------------CDC------------------------------------------------------------------- */}
                    <TabPanel>
                        <Flex flexDir="column" p={9} rounded="7px" boxShadow="md" bg={bg}>
                            <Flex flexDir="column">
                                <Flex
                                    justify="space-around"
                                    bg={bgColumn}
                                    rounded="7px"
                                    color="white"
                                    h="35px"
                                    align="center"
                                >
                                    <Text fontSize={["md", "md", "xl", "xl"]} fontWeight="bold">
                                        วันที่สั่ง
                                    </Text>
                                    <Text fontSize={["md", "md", "xl", "xl"]} fontWeight="bold">
                                        จำนวนร้องขอ
                                    </Text>
                                    <Text fontSize={["md", "md", "xl", "xl"]} fontWeight="bold">
                                        ราคารวม
                                    </Text>
                                    <Text fontSize={["md", "md", "xl", "xl"]} fontWeight="bold">
                                        สถานะ
                                    </Text>
                                </Flex>

                                <Flex flexDir="column">
                                    {fetchingCdc || !dataCdc?.giveOrderByCreatorIdCdc ? (
                                        <Flex justify="center" mt="5">
                                            <Spinner color="grey" height={50} width={50} />
                                            <Text fontWeight="bold" fontSize="2xl">
                                                &nbsp; Loading...
                                            </Text>
                                        </Flex>
                                    ) : (
                                        dataCdc.giveOrderByCreatorIdCdc.map((order) => (
                                            <OrderGiveItemCdc key={order.id} order={order} />
                                        ))
                                    )}
                                </Flex>
                            </Flex>
                        </Flex>
                    </TabPanel>
                </TabPanels>
            </Tabs>

        </>
    );
};

export default OrderGive;
