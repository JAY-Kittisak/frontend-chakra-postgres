import React from "react";
import {
    Flex,
    Text,
    useColorModeValue,
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
} from "@chakra-ui/react";

import Spinner from "../components/Spinner";
import { useGiveOrdersCdcQuery, useGiveOrdersQuery } from "../generated/graphql";
import AdminOrderGivesItem from "../components/gives/AdminOrderGivesItem";
import AdminOrderGivesItemCdc from "../components/gives/AdminOrderGivesItemCdc";

interface Props { }

const ManageGiveOrders: React.FC<Props> = () => {
    const [{ data, fetching }] = useGiveOrdersQuery();
    const [{ data: dataCdc, fetching: fetchingCdc }] = useGiveOrdersCdcQuery();
    const bg = useColorModeValue("white", "gray.700");
    const bgColumn = useColorModeValue("#028174", "#3E54D3");

    return (
        <>
            <Text
                as="i"
                fontWeight="semibold"
                fontSize={["md", "md", "xl", "3xl"]}
                bgGradient="linear(to-l, #7928CA,#FF0080)"
                bgClip="text"
            >
                Manages give order
            </Text>

            <Tabs align="end" variant="enclosed" mt="-8">
                <TabList>
                    <Tab>ลาดกระบัง</Tab>
                    <Tab>ชลบุรี</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <Flex
                            flexDir="column"
                            p={9}
                            rounded="7px"
                            boxShadow="md"
                            bg={bg}
                            mt="5"
                        >
                            <Flex flexDir="column" overflowX="auto">
                                <Flex
                                    // justify="space-around"
                                    bg={bgColumn}
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
                                        จำนวนร้องขอ
                                    </Text>
                                    <Text
                                        fontSize={["xs", "xs", "md", "xl"]}
                                        fontWeight="bold"
                                        w="21%"
                                        textAlign="center"
                                    >
                                        ราคารวม
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
                    </TabPanel>

                    {/* -------------------------------------------------------------CDC-------------------------------------------------------------------------------------------------------------------- */}

                    <TabPanel>
                        <Flex
                            flexDir="column"
                            p={9}
                            rounded="7px"
                            boxShadow="md"
                            bg={bg}
                            mt="5"
                        >
                            <Flex flexDir="column" overflowX="auto">
                                <Flex
                                    // justify="space-around"
                                    bg={bgColumn}
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
                                        จำนวนร้องขอ
                                    </Text>
                                    <Text
                                        fontSize={["xs", "xs", "md", "xl"]}
                                        fontWeight="bold"
                                        w="21%"
                                        textAlign="center"
                                    >
                                        ราคารวม
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
                                    {fetchingCdc || !dataCdc?.giveOrdersCdc ? (
                                        <Flex justify="center" mt="5">
                                            <Spinner color="grey" height={50} width={50} />
                                            <Text fontWeight="bold" fontSize="2xl">
                                                &nbsp; Loading...
                                            </Text>
                                        </Flex>
                                    ) : (
                                        dataCdc.giveOrdersCdc.map((order) => (
                                            <AdminOrderGivesItemCdc key={order.id} order={order} />
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

export default ManageGiveOrders;
